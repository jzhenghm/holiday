import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as selectors from '../store/reducer'
import * as actions from '../store/actions'
import * as modes from '../store/modeTypes'
import YearMonthForm from '../components/YearMonthForm'

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

class HolidayCalendar extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  state = {
    month: fromMonth,
  };

  handleYearMonthChange = month => {
    this.setState({ month })
    this.props.dispatch(actions.selectMonthYear(month))
  };

  handleDayClick = date => {
    if (this.props.mode !== modes.VIEW_HOLIDAYS_MODE) {
      this.props.dispatch(actions.selectDay(date));
    }
  };

  render() {
    const modifiers = {
      added: this.props.addDays,
      deleted: this.props.deleted,
    }
    const  modifiersStyles = {
      added: {
        color: 'white',
        background: '#33cccc',
      },

      deleted: {
        color: 'white',
        background: '#C0C0C0',
      }
    }
     
    return (
      <div >
        <DayPicker
          month={this.props.selectedMonth}
          fromMonth={fromMonth}
          selectedDays={this.props.holidays}
          toMonth={toMonth}
          captionElement={<YearMonthForm onChange={this.handleYearMonthChange} />}
          onMonthChange = {this.handleYearMonthChange}
          modifiers = {modifiers}
          modifiersStyles = {modifiersStyles}
          fixedWeeks
          onDayClick={this.handleDayClick} 
        />
      </div>
    );
  }
}

//export default HolidayCalendar;
const mapStateToProps = (state) => {
  const holidays = selectors.getHolidays(state);
  const selectedMonth = selectors.getSelectedMonth(state);
  const addDays = selectors.getAddDays(state);
  const deleted = selectors.getDeleteDays(state);
  const mode = selectors.getMode(state);
  return { holidays, selectedMonth, addDays, deleted, mode }
}

export default connect(mapStateToProps)(HolidayCalendar);
