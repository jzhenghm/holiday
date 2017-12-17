import React, { Component } from 'react'
//import "react-select/dist/react-select.css"
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as selectors from '../store/reducer'
import * as actions from '../store/actions'
import Dialog from  'react-bootstrap-dialog'
import Select from "react-select"

class Currency extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      currencies: [  
        {value:'USD', label:'USD', desc:'United States - US Dollar - New York'},  
        {value:'ARS', label:'ARS', desc:'Argentina - Peso - Buenos Ares'},  
        {value:'AUD', label:'AUD', desc:'Austrailia - Austrailian - Sydney'},        
        {value:'BEF', label:'BEF', desc:'Belgium - Belgium Franc - Brussele'},  
        // {value:'BEF1', label:'BEF1', desc:'Luxembourg - Belgium Franc - Luxembourg'},         
        {value:'BRL', label:'BRL', desc:'Brazil - Plano Real - San Paulo'},  
        {value:'CLF', label:'CLF', desc:'Chile - Chilean Unidad De Fomento - Santiago'},  
        {value:'CAD', label:'CAD', desc:'Canada - Canadian Dollar - Toronto'},  
        {value:'CHF', label:'CHF', desc:'Switzerland - Swiss Franc - Zurich'},  
        {value:'COP', label:'COP', desc:'Colombia - Colombia Peso - Bagota'},  
        {value:'DEM', label:'DEM', desc:'Germany - Deutsche Mark - Frankfurt'},       
        {value:'ECU', label:'ECU', desc:'Europe - EURO - European'},  
        {value:'FRF', label:'FRF', desc:'France - French Franc - Paris'},  
        {value:'GBP', label:'GBP', desc:'Pound Sterling - London'},  
        {value:'HKD', label:'HKD', desc:'Hong Kong - Hong Kong Dollar - Hong Kong'},  
        {value:'ITL', label:'ITL', desc:'Italy - Italian Lira - Milan'},  
        {value:'MXN', label:'MXN', desc:'Mexico - Mexican Peso - Mexico City'},       
        {value:'JPY', label:'JPY', desc:'Japan - Japaness Yen - Tokyo'},  
        {value:'ESP', label:'ESP', desc:'Spain - Spanish Peseta - Madrid'},  
        {value:'SEK', label:'SEK', desc:'Swecen - Swedish Krona - Stockholm'},  
        {value:'PEN', label:'PEN', desc:'Peru - Nuevo Sol - Lima'},  
        {value:'PHP', label:'PHP', desc:'Philipines - Philipine Peso - Manila'},       
        {value:'VEB', label:'VEB', desc:'Venezuela - Boliva - Caracas'},        
      ],        
      selectedDesc: 'United States - US Dollar - New York',
      selectedValue: 'USD'
    }
  }

  filterDesc = (value) => { 
    let index = -1    
    for (var i = 0; i<this.state.currencies.length; i++) {
      if (this.state.currencies[i].value === value) {
        index = i
        break
      }
    }

   // find out if there is a better way such as using filter:
   // const currency = this.state.currencies.filter(c => (c.value === value))
    console.log('currency.value:'+ this.state.currencies[index].value)
    console.log('currency.desc:'+ this.state.currencies[index].desc)
    return this.state.currencies[index].desc 
  }

  handleChange = (e) => {
    const adds = this.props.addDays;
    const deletes = this.props.deleteDays;
    const commitable = 
      ((adds !== 'undefined' && adds.length > 0) || (deletes !== 'undefined' && deletes.length > 0))
    if (commitable) {
      this.dialog.showAlert('You have uncommited changes!');
    } else {
      this.setState({selectedDesc: this.filterDesc(e.value)});
      this.setState({selectedValue: e.value});
      console.log("Currency we selected value:" + e.value);
      this.props.dispatch(actions.selectCurrency(e.value));
    }
  }

  render() {    
    return (   //, display: 'inline-block'
      <div>
        <div style={{width: '270px'}}>
          <div style={{display: 'inline-block', fontSize: '11px', width: '30%',padding: '0px 5px'}}> 
            <Select
              // This mapping is required to avoid repeat 'style'. also you cannot make 
              // it as seperate function assign to options for some reason the function 
              // can not be loaded.
              // map(x =>
              //   { return { value: x.value, label: x.value, style: { fontSize: 11, padding: '5px 10px' }}}
              // )} 
              options={this.state.currencies}
              onChange={this.handleChange} 
              value = {this.props.currency}
              clearable={false}
            />
          </div>
          <div style={{display: 'inline-block', width: '70%', float: 'right', verticalAlign: 'top', fontSize: '13px'}}>  
            {this.state.selectedDesc}
          </div>
        </div> 
        <Dialog ref={(el)=> {this.dialog = el}} />
      
      </div>
    )
  }
}

function mapStateToProps(state) {
  const addDays = selectors.getAddDays(state);
  const deleteDays = selectors.getDeleteDays(state);
  const currency = selectors.getCurrency(state);
  return { currency, addDays, deleteDays };
}

export default connect(mapStateToProps)(Currency);
