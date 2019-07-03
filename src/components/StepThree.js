import React from 'react';
import _ from 'lodash';

import Card from './Card';

class StepThree extends React.Component {
  getValue = (values, colIndex, rowIndex) => {
    const { cols, rows } = this.props;
    const valuesIndex = this.getValuesIndex(rowIndex, colIndex, rows, cols);

    return values[valuesIndex];
  }

  getValuesIndex = (rowIndex, colIndex, rows, cols) => {
    let valuesIndex = null;

    if (rowIndex > 0) {
      valuesIndex = (rowIndex * cols) + (colIndex % cols)
    } else {
      valuesIndex = colIndex;
    }

    return valuesIndex;
  }

  handleLocalStorageFlipped = (valuesIndex) => e => {
    let localFlipped = [];
    if (localStorage.getItem('opened')) {
      localFlipped = localStorage.getItem('opened').split(',').map(el => parseInt(el));
    }
    localStorage.setItem('opened', _.uniqBy(localFlipped.concat(valuesIndex), i => i));
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
    const { values, cols, rows, openedCards } = this.props;

    return _.times(cols, (colIndex) => {
      const valuesIndex = this.getValuesIndex(rowIndex, colIndex, rows, cols);
      const flipped = openedCards.indexOf(valuesIndex) > -1;

      return (
        <Card
          value={this.getValue(values, colIndex, rowIndex)}
          rows={rows}
          cols={cols}
          flipped={flipped}
          updateLocalStorageFlipped={this.handleLocalStorageFlipped(valuesIndex)}
          key={valuesIndex}
        />
      );
    })
  }

  render() {
    const { rows } = this.props;

    return (
      <div>
        {this.renderRows(rows)}
      </div>
    );
  }
}

export default StepThree;
