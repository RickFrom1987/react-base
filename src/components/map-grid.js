import React, {Component} from 'react';
import ReactDataSheet from 'react-datasheet';
import {Link} from 'react-router';
import {WHITE_TRANSPARENT, GREY, GREY_O, GREY_1, GREY_2 } from '../constants/colors';
import '../third-party/react-datasheet.css';

class MapGrid extends Component {
  static propTypes = {}

  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = {
      grid: [
        [
          {readOnly: true, value: ''}, 
          {value: 'A', readOnly: true}, 
          {value: 'B', readOnly: true}, 
          {value: 'C', readOnly: true}, 
          {value: 'D', readOnly: true}
        ],
        [{readOnly: true, value: 1}, {value: 1}, {value: 3}, {value: 3}, {value: 3}],
        [{readOnly: true, value: 2}, {value: 2}, {value: 4}, {value: 4}, {value: 4}],
        [{readOnly: true, value: 3}, {value: 1}, {value: 3}, {value: 3}, {value: 3}],
        [{readOnly: true, value: 4}, {value: 2}, {value: 4}, {value: 4}, {value: 4}]
      ]
    }
  }

  handleChange = (modifiedCell, colI, rowJ, value) => {
    this.setState({
      grid: this.state.grid.map((row) =>
        row.map((cell) =>
          (cell === modifiedCell) ? ({value: value}) : cell
        )
      )
    })
  }

  render () {
    console.log("TEST", this.state.grid)
    return (
      <ReactDataSheet
        data={this.state.grid}
        valueRenderer={(cell) => cell.value}
        onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
        onChange={this.handleChange}
      />
    )
  }
}

export default MapGrid;
