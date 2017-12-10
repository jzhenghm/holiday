import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as modes from '../store/modeTypes'
import * as selectors from '../store/reducer'
import * as actions from '../store/actions'
import * as utils from '../store/utils'
import Dialog from  'react-bootstrap-dialog'
import * as moment from 'moment'
//import '../App.css'

class ControlButtons extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleReload = () => {
    console.log("reload click")
    this.props.dispatch(actions.reload())
  }

  handleRemove = () => {
    console.log("remove click")
    this.props.dispatch(actions.deleteClicked())
  }

  handleAdd = () => {
    console.log("add click")
    this.props.dispatch(actions.addClicked())
  }

  handleCommit () {
    const addDayStr = this.props.addDays.map (d => { 
      const str = moment(d).format('YYYYMMDD');
      return str }).join();
    const deleteDayStr = this.props.deleteDays.map (d => { 
      const str = moment(d).format('YYYYMMDD');
      return str }).join();
  
    this.dialog.show ({
      body: `You are commiting to add ${addDayStr} and delete ${deleteDayStr}.`,

      bsSize: 'small',
      actions: [
        Dialog.CancelAction(),

        Dialog.OKAction(() => {
          console.log(`You are commiting to add ${addDayStr}`);
          this.props.dispatch(actions.commitChanges());
        })
      ]
    })
  }

  render() {  
    const adds = this.props.addDays;
    const deletes = this.props.deleteDays;
    const commitable = 
      ((adds !== 'undefined' && adds.length > 0) || (deletes !== 'undefined' && deletes.length > 0))
 
    return (
      <div>
        <div style={{width: '350px'}}>
          <div style={{display: 'inline-block', padding: '0px 2px'}}><Button bsStyle='primary' bsSize='small' 
                onClick={() => this.props.dispatch(actions.reload())}>Reload</Button></div>
          <div style={{display: 'inline-block', padding: '0px 2px'}}><Button bsStyle='primary' bsSize='small' onClick={this.handleAdd}>Add Holiday</Button></div>
          <div style={{display: 'inline-block', padding: '0px 2px'}}><Button bsStyle='primary' bsSize='small' onClick={this.handleRemove}>Remove Holiday</Button></div>
          <div style={{display: 'inline-block', padding: '0px 2px'}}><Button bsStyle='primary' bsSize='small' onClick={this.handleCommit} disabled={!commitable}>Commit</Button></div> 
          <Dialog ref={(el)=> {this.dialog = el}} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const mode = selectors.getMode(state);
  const addDays = selectors.getAddDays(state);
  const deleteDays = selectors.getDeleteDays(state);
  return { mode, addDays, deleteDays }
}

export default connect(mapStateToProps)(ControlButtons)