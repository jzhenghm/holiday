import holidayService from '../services/IquantHoliday'
import * as types from './actionTypes'
import * as modes from './modeTypes'
import * as selectors from './reducer'
import { DateUtils } from "react-day-picker"
import * as moment from 'moment'
import {Modal} from 'react-bootstrap'
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from 'constants';
import { setTimeout } from 'timers';

//import * as log4js from 'log4js'

// log4js.configure(
//   {
//     appenders: {
//       file: {
//         type: 'file',
//         filename: 'important-things.log',
//         maxLogSize: 10 * 1024 * 1024, // = 10Mb
//         numBackups: 5, // keep five backup files
//         compress: true, // compress the backups
//         encoding: 'utf-8',
//         mode: 0o0640,
//         flags: 'w+'
//       },
//       dateFile: {
//         type: 'dateFile',
//         filename: 'more-important-things.log',
//         pattern: 'yyyy-MM-dd-hh',
//         compress: true
//       },
//       out: {
//         type: 'stdout'
//       }
//     },
//     categories: {
//       default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' }
//     }
//   }
// );

// const logger = log4js.getLogger('things');

const commitable = (getState) => {
  const adds = selectors.getAddDays(getState());
  const deletes = selectors.getDeleteDays(getState());
  const commitable = ((adds !== 'undefined' && adds.length > 0) || 
                      (deletes !== 'undefined' && deletes.length > 0))
  return commitable;
}

export function selectTradeType(tradeType) {
   return async (dispatch, getState) => {
    if (commitable(getState))
      alert('You have uncommited changes');
    else {
      try {  
        const currency = selectors.getCurrency(getState());
        const selectedMonth = selectors.getSelectedMonth(getState());
        const holidays = await holidayService.getHolidays(selectedMonth, currency, tradeType);
        dispatch({type: types.TRADE_TYPE_SELECTED, holidays, tradeType});
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export function selectHolidays() {
  return async(dispatch, getState) => {
    try {
      const tradeType = selectors.getTradeType(getState());
      const currency = selectors.getCurrency(getState());
      const selectedMonth = selectors.getSelectedMonth(getState());
      const holidays = await holidayService.getHolidays(selectedMonth, currency, tradeType);
      dispatch({type: types.HOLIDAY_SELECTED, holidays});
    } catch (error) {
      console.error(error);
    }
  }
}

export function selectCurrency(currency) {
  return async (dispatch, getState) => {
    if (commitable(getState))
      alert('You have uncommited changes');
    else {
    
      try {  
        const tradeType = selectors.getTradeType(getState());
        const selectedMonth = selectors.getSelectedMonth(getState());
        const holidays = await holidayService.getHolidays(selectedMonth, currency, tradeType);
        console.debug('got holidays:'+holidays)
        dispatch({type: types.CURRENCY_SELECTED, holidays, currency});
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export function selectHolidayInList(holiday) {
  return (dispatch) => {
    try {  
      const y = holiday.substring(0, 4) // not working with subStr!!!
      const m = holiday.substring(4, 6);
      console.log('yyyy:'+ y +' mm:'+ m);      
      const selectedMonth = new Date(y, m - 1);
      console.log('selectedMonth:'+selectedMonth);
      dispatch({type: types.HOLIDAY_IN_LIST, selectedMonth});
    } catch (error) {
      console.error(error);
    }
  }
}

export function selectMonthYear(date) {
  return async (dispatch, getState) => {
    try {  
      const currentMonth = selectors.getSelectedMonth(getState())
      const previousSelected = currentMonth.getYear()
      const selectedYear = date.getYear()   
      const currency = selectors.getCurrency(getState())
      const tradeType = selectors.getTradeType(getState())
      if (selectedYear !== previousSelected) {
        console.log('selectMonthYear()/diff:'+selectedYear)
        const holidays = await holidayService.getHolidays(date, currency, tradeType);
        dispatch({type: types.YEAR_MONTH_SELECTED, holidays, selectedMonth: date})
      } else {
        console.log('selectMonthYear()/same:'+selectedYear)
        dispatch({type: types.MONTH_SELECTED, selectedMonth: date})
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export function selectDay(date) {
  return (dispatch, getState) => {
    try {
      const holidays = selectors.getHolidays(getState())
      const addDays = selectors.getAddDays(getState())
      const deleteDays = selectors.getDeleteDays(getState())

      const date_ = moment(date).format('YYYYMMDD')
      console.log('date_'+date_)
      const date1 = moment(date_).toDate()

      const existHoliday = holidays.filter(d => {
        return DateUtils.isSameDay(d, date1)
      }).length > 0

      const undoAdd = addDays.filter(d => {
        return DateUtils.isSameDay(d, date1)
      }).length > 0

      const undoDelete = deleteDays.filter(d => {
        return DateUtils.isSameDay(d, date1)
      }).length > 0

      console.log('isHoliday:' + existHoliday+ 'isUndoAdd:'+undoAdd)

      const currentMode = selectors.getMode(getState())

      // Default mode is view mode to protect from excidentally remove or add holiday. 
      // user can Add and/or delete holiday after click the button
      const canAdd =  currentMode === modes.ADD_HOLIDAYS_MODE || currentMode === modes.ADD_DELETE_HOLIDAYS_MODE

      const canDelete = currentMode === modes.DELETE_HOLIDAYS_MODE || currentMode === modes.ADD_DELETE_HOLIDAYS_MODE

      // click on a white cell 
      if (!existHoliday && !undoAdd && canAdd) { 
        const newAddDays = [...addDays, date1]
        console.debug("pushed:"+newAddDays)
        dispatch({type: types.ADD_HOLIDAY, addDays: newAddDays})

      } 
      // click on a cell which selected to add
      else if (!existHoliday && undoAdd){ 
        const newAddDays = addDays.filter(day => !DateUtils.isSameDay(date1,day))
        dispatch({type: types.UNDO_ADD_HOLIDAY, addDays: newAddDays})  
      } 
      // click on a cell to delect
      else if (existHoliday && !undoDelete && canDelete) { 
        const newDeleteDays = [...deleteDays, date1]
        dispatch({
          type: types.DELETE_HOLIDAY, 
          deleteDays: newDeleteDays, 
        })
      } 
      // click a deleted holiday to undelete
      else if (existHoliday && undoDelete){ 
        const newDeleteDays = deleteDays.filter(day => !DateUtils.isSameDay(date1,day))
        dispatch({
          type: types.UNDO_DELETE_HOLIDAY, 
          deleteDays: newDeleteDays, 
        })
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export function addClicked() {
  return (dispatch, getState) => {
    const existingMode = selectors.getMode(getState());

    var newMode = null;
    switch(existingMode) {
      case modes.VIEW_HOLIDAYS_MODE:
        newMode =  modes.ADD_HOLIDAYS_MODE;
        break;
      case modes.DELETE_HOLIDAYS_MODE:
        newMode = modes.ADD_DELETE_HOLIDAYS_MODE;
      default:
        console.log(existingMode);
    }

    if (newMode != null)
    dispatch({type: types.ADD_HOLIDAY_CLICKED, mode: newMode}); 
  }
}

export function deleteClicked() {
  return (dispatch, getState) => {
    const existingMode = selectors.getMode(getState());
    const newMode = existingMode === modes.VIEW_HOLIDAYS_MODE ? modes.DELETE_HOLIDAYS_MODE : modes.ADD_DELETE_HOLIDAYS_MODE;
    dispatch ({type: types.DELETE_HOLIDAY_CLICKED, mode: newMode});
  }
}

export function reload() {
  return async (dispatch, getState) => {
    try {
      const tradeType = selectors.getTradeType(getState());
      const currency = selectors.getCurrency(getState());
      const selectedMonth = selectors.getSelectedMonth(getState());
      const holidays = await holidayService.getHolidays(selectedMonth, currency, tradeType);
      dispatch ({type: types.RELOAD_CLICKED, holidays});
    } catch (error) {
      console.error(error);
    }
    
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function commitChanges() {
  return async (dispatch, getState) => {
    try {

      // logger.debug('This little thing went to market');
      // logger.info('This little thing stayed at home');
      // logger.error('This little thing had roast beef');
      // logger.fatal('This little thing had none');
      // logger.trace('and this little thing went wee, wee, wee, all the way home.');

      const addHolidays = selectors.getAddDays(getState());
      const deleteHolidays = selectors.getDeleteDays(getState());
      console.log('add:'+addHolidays+' deleted:'+ deleteHolidays);

      const currency = selectors.getCurrency(getState());
      const tradeType = selectors.getTradeType(getState());
      const selectedMonth = selectors.getSelectedMonth(getState());
      const result = await holidayService.updateHolidays(deleteHolidays, addHolidays, currency, tradeType);
      //await sleep(500)
      if (result) {
        const holidays = await holidayService.getHolidays(selectedMonth, currency, tradeType);
        dispatch ({type: types.COMMIT_CHANGES, holidays});     
      }
    } catch (error) {
      console.error(error);
    }

  }
}
