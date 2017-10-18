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
import Currency from './currency.jsx'
import TradeType from './tradeType.jsx'
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Select from "react-select";

const format = 'YYYY-MM-DD HH:mm:ss';
const cn = false; //location.search.indexOf('cn') !== -1;

var tradeOption = [
  {value: 'SWAP', label: 'SWAP'},
  {value: 'CASH', label: 'CASH'},
  {value: 'EQUITY', label: 'EQUITY'}
]

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

function getCurrency(value) {
  console.log(value);
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
    <form>
    <div style={{ margin: 10 }}>
      <table>
        <tr>
          <td colspan='2'>
            <table>
              <tr>
                <td> <TradeType />&nbsp; </td>     
                <td> <Currency />&nbsp; </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table>
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
                />&nbsp; 
            </td>
            <td>
              <table>
                <tr><td className='middle'><b>Holidays</b></td></tr>
                <tr><td><HolidayList /></td></tr>
              </table>
            </td>
            </tr>
            </table>
            </td>  
        </tr>
        <tr>
          <td colspan='2'>
            <Button bsStyle='primary' bsSize='small'>Reload</Button>&nbsp;
            <Button bsStyle='primary' bsSize='small'>Add Holiday</Button>&nbsp;
            <Button bsStyle='primary' bsSize='small'>Remove Holiday</Button>&nbsp;
            <Button bsStyle='primary' bsSize='small' disabled>Commit</Button>
          </td>
        </tr>
        {/* <tr><td colspan='2'><Currency /></td></tr> */}
      </table>
     
    </div>
    <div style={{ clear: 'both' }}></div>
    </form>
  </div>
</div>), document.getElementById('__react-content'));
