import React, { Component } from 'react';
import HolidayList from './containers/HolidayList.js'
import Currency from './containers/Currency.jsx'
import TradeType from './containers/TradeType.jsx'
import HolidayCalendar from './containers/HolidayCalendar.js'
import ControlButtons from './containers/ControlButtons.jsx'

class App extends Component {
  render() {  
    return (
    <div className='App'>
      <form>
        <div style={{ margin: 10 }}>
          <table>
            <tr>
              <td>
                <div style={{width: '360px'}}>
                  <div style={{display: 'inline-block'}}><TradeType /></div>
                  <div style={{display: 'inline-block'}}><Currency /></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{width: '360px'}}>
                  <div style={{display: 'inline-block'}}><HolidayCalendar /></div>
                  <div style={{display: 'inline-block', padding: '15px 5px', 'vertical-align': 'top'}}><HolidayList /></div>
                </div>
              </td>  
            </tr>
            <tr>
              <td>
                <ControlButtons />               
              </td>
            </tr>
          </table>     
        </div>
        <div style={{ clear: 'both' }}></div>
      </form>
    </div>
    );
  }
}

export default App;