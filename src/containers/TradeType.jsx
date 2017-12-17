import React, { Component } from 'react';
import autoBind from 'react-autobind';
//import "react-select/dist/react-select.css";
//import "react-select/scss/default";
import { connect } from 'react-redux'
import * as selectors from '../store/reducer'
import * as actions from '../store/actions'
import Dialog from  'react-bootstrap-dialog'
import Select from "react-select"
import styled from 'styled-components'
//import '../App.css'


class TradeType extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
        types: [
          {"value": 'SWAP', label: 'SWAP'},
          {value: 'CASH', label: 'CASH'},
          {value: 'EQUITY', label: 'EQUITY'},
        ],       
      selectedValue: 'SWAP',
      selectedLabel: 'SWAP'// this.props.tradeType
    }
  }

  handleChange = (e) => {
    const adds = this.props.addDays;
    const deletes = this.props.deleteDays;
    const commitable = 
      ((adds !== 'undefined' && adds.length > 0) || (deletes !== 'undefined' && deletes.length > 0))
    if (commitable) {
      this.dialog.showAlert('You have uncommited changes!');
    } else {
      console.log("TradeType we selected value:" + e.value);
      this.props.dispatch(actions.selectTradeType(e.value));

    }   
  }

  render() {    
    // .map(x => 
    //   { return { value: x.value, label: x.value, style: { fontSize: 11, padding: '5px 10px' }}}
    // )}
     return (     
      <div style={{width: 85, fontSize: '11px'}}>
        <Select className='select-up'
          options={this.state.types}
          onChange={this.handleChange} 
          value = {this.props.tradeType}
          clearable={false}
        />  
        <Dialog ref={(el)=> {this.dialog = el}} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const addDays = selectors.getAddDays(state);
  const deleteDays = selectors.getDeleteDays(state);
  const tradeType = selectors.getTradeType(state);
  return {tradeType, addDays, deleteDays};
}

export default connect(mapStateToProps)(TradeType);