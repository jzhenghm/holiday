import React, { Component } from 'react';
import axios from 'axios';

class HolidayList extends Component {
    constructor(props) {
    super(props);
    this.createSelectItems = this.createSelectItems.bind(this);
    this.state = {
      holidays: []
    }
  }

  componentWillMount() {
    var self = this;
    axios.get('http://localhost/api/iquant/rest?action=holidays&date=20161125,20171231&currency=USD&operation=list&type=SWAP')
    .then(function(response) {
      var xml_str = response.data;
      var resp_start = xml_str.indexOf("<response");
      var id0_s = xml_str.indexOf("<", resp_start + 1);
  
      var resp_end = xml_str.indexOf("</response>");
      var resp_len = resp_end - (id0_s);
      var holidayStr = xml_str.substr(id0_s, resp_len);
      var holidayRawStrs = holidayStr.split("\n").filter(s => s.length > 8);  // acturally should be more than 20 chars.
      var holidays_ = holidayRawStrs.map(s => { 
        var s_start = s.indexOf("<");
        var r = s.substr(s_start + 6, 8);
        console.log(s+" "+s_start+" "+r);
        return r;
       })
       .sort();

      self.setState({
        holidays: holidays_
      });
    });
  }

  createSelectItems() {
    let items = [];     
    for (var i = 0; i<this.state.holidays.length; i++) {
      items.push(<option key={i} value={this.state.holidays[i]}>{this.state.holidays[i]}</option>);
    }
    return items;
  } 
  
  render() {
    return (
      <select mutiple size='14'>
        {this.createSelectItems()}
      </select>
    );
  }
}
export default HolidayList;


