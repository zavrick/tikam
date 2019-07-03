import React from 'react';
import _ from 'lodash';

import Card from './Card';

class StepThree extends React.Component {
  getValue = (values, colIndex, rowIndex) => {
    const { cols } = this.props;
    let valuesIndex = null;

    if (rowIndex > 0) {
      valuesIndex = (rowIndex * cols) + (colIndex % cols)
    } else {
      valuesIndex = colIndex;
    }

    return values[valuesIndex];
  }

  renderRows = (count) => {
    return _.times(count, (rowIndex) => {
      return (
        <div
          key={rowIndex}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {this.renderRow(rowIndex)}
        </div>
      );
    })
  }

  renderRow = (rowIndex) => {
    const { values, cols, rows } = this.props;

    return _.times(cols, (colIndex) => {
      return (
        <Card
          value={this.getValue(values, colIndex, rowIndex)}
          rows={rows}
          cols={cols}
        />
      );
    })
  }

  render() {
    const { rows } = this.props;
    console.log(this.props.values)
    return (
      <div>
        {this.renderRows(rows)}
      </div>
    );
  }
}

export default StepThree;
