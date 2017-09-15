import React, { Component } from 'react';

//import {render} from 'react-dom'
// import FilteredMultiSelect from 'react-filtered-multiselect'
// const CULTURE_SHIPS = [
//   {id: 1, name: '20161001'},
//   {id: 2, name: '20161102'},
//   {id: 11, name: '20161001'},
//   {id: 22, name: '20161101'},
//   {id: 31, name: '20161001'},
//   {id: 42, name: '20161101'},
//   {id: 249, name: '20161201'},
//   {id: 250, name: '20161231'}
// ]

// class HolidayList extends Component {
//   state = {selectedShips: []}

//   handleDeselect(index) {
//     var selectedShips = this.state.selectedShips.slice()
//     selectedShips.splice(index, 1)
//     this.setState({selectedShips})
//   }

//   handleSelectionChange = (selectedShips) => {
//     this.setState({selectedShips})
//   }

//   render() {
//     var {selectedShips} = this.state
//     return <div>
//       <FilteredMultiSelect
//         onChange={this.handleSelectionChange}
//         options={CULTURE_SHIPS}
//         selectedOptions={selectedShips}
//         textProp="name"
//         valueProp="id"
//         size="15"
//       />
//     </div>
//   }
// }
// 'App-textarea'
class HolidayList extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    return (
      <select mutiple size='14' cols='10'>
          <option>20101010</option>
          <option>20101210</option>
      </select>
    );
  }
}
export default HolidayList;