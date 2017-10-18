import React, { Component } from 'react';
import "react-select/dist/react-select.css";
import Select from "react-select";

class currency extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currencies: [
        {label:'USD', value:'United States - US Dollar - New York', clearableValue: false }, 
        {label:'CAD', value:'Canada - Canadian Dollar - Toronto', clearableValue: false}, 
        {label:'ECU', value:'Europe - EURO - European'},    
        {label:'GBP', value:'Pound Sterling - London'}, 
        {label:'JPY', value:'Japan - Japaness Yen - Tokyo'}],
      selectedValue: 'United States - US Dollar - New York',
      selectedLabel: 'USD'
    }
  }

  handleChange(e) {
    this.setState({selectedLabel: e.label});
    this.setState({selectedValue: e.value});
    console.log("here we selected value:" + e.value);
  }

  render() {    
    return (
      // <div className="currency">      
        <div style={{ width: 280, fontSize: "12px"}}>
          <table>
            <tr>
              <td>
                <div style={{width: 70, height:30}}>
                  <Select
                    options={this.state.currencies.map(i =>
                        { return { label: i.label, value: i.value }; })} 
                    onChange={this.handleChange} 
                    value={this.state.selectedValue}
                    clearable={false} />
                </div>
              </td>
              <td> {this.state.selectedValue} </td>
            </tr>
          </table>
        </div>         
      // </div>
    )
  }
}

export default currency;