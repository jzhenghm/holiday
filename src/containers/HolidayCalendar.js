import React, { Component } from 'react'
import DayPicker from 'react-day-picker';
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import 'react-day-picker/lib/style.css';
import * as selectors from '../store/reducer'
import * as actions from '../store/actions'
import * as modes from '../store/modeTypes'

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
   
    <form className="DayPicker-Caption">
     <div style={{display: 'inline-block', border: 'none', }}>
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => 
          <option key={i} value={i}>{month}</option>)}
      </select>
      </div>
      <div style={{display: 'inline-block', border: 'none'}}>
        <select name="year" onChange={handleChange} value={date.getFullYear()}>
          {years.map((year, i) =>
            <option key={i} value={year}>{year}</option>
          )}
        </select>    
      </div>
    </form>

  );
}

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
