import React, { Component } from 'react';
import "react-select/dist/react-select.css";
import Select from "react-select";

class tradeType extends Component {
    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currencies: [
        {value: 'SWAP', label: 'SWAP'},
        {value: 'CASH', label: 'CASH'},
        {value: 'EQUITY', label: 'EQUITY'}],
      selectedValue: 'SWAP'}
  }

  handleChange(e) {
    this.setState({selectedValue: e.value});
    console.log("here we selected value:" + e.value);
  }

  render() {    
    return (     
      <div style={{width: 80, height:30}}>
        <Select
            options={this.state.currencies.map(i =>
                { return { label: i.label, value: i.value }; })} 
            onChange={this.handleChange} 
            value={this.state.selectedValue}
            clearable={false} />
      </div>
    )
  }
}

export default tradeType;