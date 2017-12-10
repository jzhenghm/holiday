
import * as types from './actionTypes';
import * as modes from './modeTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  mode: modes.VIEW_HOLIDAYS_MODE,
  tradeType: 'SWAP',
  currency: 'USD',
  holidays: [],
  selectedMonth: new Date(),
  // add day
  addDays: [],
  // delete day
  deleteDays: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TRADE_TYPE_SELECTED:
      return state.merge ({
        tradeType: action.tradeType,
        holidays: action.holidays
      });

    case types.CURRENCY_SELECTED:
      return state.merge({
        currency: action.currency,
        holidays: action.holidays
      });

    case types.HOLIDAY_SELECTED:
      return state.merge({
        holidays: action.holidays
      });

    case types.HOLIDAY_IN_LIST: // not needed
      return state.merge({
        selectedMonth: action.selectedMonth    
      });

    case types.YEAR_MONTH_SELECTED:
      return state.merge({
        selectedMonth: action.selectedMonth,
        holidays: action.holidays   
      });

    case types.MONTH_SELECTED:
      return state.merge({
        selectedMonth: action.selectedMonth
      });

    case types.ADD_HOLIDAY:
    case types.UNDO_ADD_HOLIDAY:
      return state.merge({
        addDays: action.addDays,
      }); 

    case types.DELETE_HOLIDAY:
    case types.UNDO_DELETE_HOLIDAY:  
      return state.merge({
        deleteDays: action.deleteDays,
      });

    case types.ADD_HOLIDAY_CLICKED:
    case types.DELETE_HOLIDAY_CLICKED:
      console.log('types.ADD/DELETE:'+ action.mode);
      return state.merge({
        mode: action.mode,
      });

    case types.RELOAD_CLICKED:
    case types.COMMIT_CHANGES:
      return state.merge({
        // addDeleteDaysCurrency: undefined,
        // addDeleteDaysTradeType: undefined,
        mode: initialState.mode,
        addDays: [],
        // delete day
        deleteDays: [],
        holidays: action.holidays,      
      })
    default:
      console.log(state);
      return state
  }
}

export function getState(state) {
  const tradeType = state.view.tradeType;
  const currency = state.view.currency;
  const holidays = state.view.holidays;
  const selectedMonth = state.view.selectedMonth;
  const addDays = state.view.addDays;
  return [tradeType, currency, holidays, selectedMonth, addDays];
}

export function getInitialState() {
  return initialState
}

// Selectors
export function getTradeType(state) {
  return state.view.tradeType;
}

export function getCurrency(state) {
  return state.view.currency;
}

export function getHolidays(state) {
  return state.view.holidays;
}

export function getSelectedMonth(state) {
  return state.view.selectedMonth
}

export function getAddDays(state) {
  return state.view.addDays
}

export function getDeleteDays(state) {
  return state.view.deleteDays
}

export function getMode(state) {
  return state.view.mode;
}