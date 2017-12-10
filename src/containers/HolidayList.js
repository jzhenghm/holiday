import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as selectors from '../store/reducer'
import * as actions from '../store/actions'
import * as moment from 'moment'
import "../App.css"

class HolidayList extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount = () => {
    this.props.dispatch(actions.selectHolidays());
  }

  createSelectItems = () => { 
    const items = this.props.holidays
      .map(x => {
        console.log('HolidayList/holiday in date:'+x);
        const date = moment(x).format('YYYYMMDD');
        const opt = <option value={date}>{date}</option>;
        console.log('createSelectItems:opt'+opt);
        return opt;
    }) 
    console.log('HolidayList/holidays item:'+items)
    return items; 
  } 

  handleChange = (e) => { 
    console.log('selected:'+e.target.value);  //e.target.value?
    this.props.dispatch(actions.selectHolidayInList(e.target.value));
  }

  render() {
    return (
      <div style={{'text-align': 'center', 'vertical-align': 'top'}}>
        <div style={{display: 'inline-block'}}>Holidays
        </div>
        <div className='select-list'>
          <select  size='12'
            onChange={this.handleChange} >
            {this.createSelectItems()}
          </select>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const holidays = selectors.getHolidays(state);
 // const deleteDays = selectors.getDeleteDays(state);
  return { holidays };
}

export default connect(mapStateToProps)(HolidayList);

