import 'rc-calendar/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import './App.css'
import HolidayList from './HolidayList.jsx'

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/Button';
import MenuItem from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/Button';

const format = 'YYYY-MM-DD HH:mm:ss';
const cn = false; //location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

function disabledTime(date) {
  console.log('disabledTime', date);
  if (date && (date.date() === 15)) {
    return {
      disabledHours() {
        return [3, 4];
      },
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    },
  };
}

function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();  // can not select days before today
}

function enableCommit() {

}

var createReactClass = require('create-react-class');

const Test = createReactClass({
  propTypes: {
    defaultValue: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
  },

  getInitialState() {
    return {
      showTime: true,
      showDateInput: true,
      disabled: false,
      value: this.props.defaultValue,
    };
  },

  onChange(value) {
    console.log('DatePicker change: ', (value && value.format(format)));
    this.setState({
      value,
    });
  },

  onShowTimeChange(e) {
    this.setState({
      showTime: e.target.checked,
    });
  },

  onShowDateInputChange(e) {
    this.setState({
      showDateInput: e.target.checked,
    });
  },

  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },

  render() {
    const state = this.state;
    const calendar = (<Calendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
      dateInputPlaceholder="please input"
      formatter={getFormat(state.showTime)}
      disabledTime={state.showTime ? disabledTime : null}
      timePicker={state.showTime ? timePickerElement : null}
      defaultValue={this.props.defaultCalendarValue}
      showDateInput={state.showDateInput}
      disabledDate={disabledDate}
    />);
    return (<div style={{ width: 400, margin: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={state.showTime}
            onChange={this.onShowTimeChange}
          />
          showTime
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            type="checkbox"
            checked={state.showDateInput}
            onChange={this.onShowDateInputChange}
          />
          showDateInput
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            checked={state.disabled}
            onChange={this.toggleDisabled}
            type="checkbox"
          />
          disabled
        </label>
      </div>
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5,
        marginBottom: 22,
      }}
      >
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                <input
                  placeholder="please select"
                  style={{ width: 250 }}
                  disabled={state.disabled}
                  readOnly
                  tabIndex="-1"
                  className="ant-calendar-picker-input ant-input"
                  value={value && (value.format(getFormat(state.showTime)) || '')}
                />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    </div>);
  },
});


function onStandaloneSelect(value) {
  console.log('onStandaloneSelect');
  console.log(value && value.format(format));
}

function onStandaloneChange(value) {
  console.log('onStandaloneChange');
  console.log(value && value.format(format));
}


ReactDOM.render((<div
  style={{
    Index: 1000,
    position: 'relative',
    width: 900,
    margin: '20px auto',
  }}
>
  <div>
    <div style={{ margin: 10 }}>
      <table>
        <tr>
          <td colSpan='2'>
            <table>
              <tr>
              <td>
                 {/*  <ButtonToolbar>
                <DropdownButton bsSize="small" title="Small button" id="dropdown-size-small">
                  <MenuItem eventKey="1">Action</MenuItem>
                  <MenuItem eventKey="2">Another action</MenuItem>
                  <MenuItem eventKey="3">Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
              </ButtonToolbar> */}
                  <select className='App-option'>
                    <option value='SWAP'>SWAP</option>
                    <option value='CASH'>CASH</option>
                    <option value='EQUITY'>EQUITY</option>
                  </select>
                  <select className='App-option'>
                    <option value='USD'>USD</option>
                    <option value='GBP'>GPB</option>
                    <option value='CAD'>CAD</option>
                  </select>
                </td>
                <td nowrap className='right'>United States - US Dollor - New York
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <Calendar
              showWeekNumber={false}
              locale={enUS}
              defaultValue={now}
              disabledTime={disabledTime}
              showToday={false}
              showDateInput={false}
              formatter={getFormat(true)}
              showOk={false}
              timePicker={null}
              onChange={onStandaloneChange}
              disabledDate={false}
              onSelect={onStandaloneSelect}
            />
            </td>
            <td>
              <table>
                <tr><td className='middle'><b>Holidays</b></td></tr>
                {/* <tr><td><textarea className='App-textarea' rows='15' cols='10'></textarea></td></tr> */}
                <tr><td><HolidayList /></td></tr>

              </table>
          </td>
        </tr>
        <tr>
          <td colSpan='2'>
   
            <Button bsStyle="primary" bsSize="small" active>Reload</Button>
            <Button bsStyle='primary' bsSize='small'>Add Holiday</Button>
            <Button bsStyle='primary' bsSize='small'>Remove Holiday</Button>
            <Button bsStyle='primary' bsSize='small' disabled>Commit</Button>

          </td>
        </tr>
      </table>
    </div>
    <div style={{ clear: 'both' }}></div>
  </div>
</div>), document.getElementById('__react-content'));