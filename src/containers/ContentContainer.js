import React from 'react';
import { Button } from 'antd';
import _ from 'lodash';

import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';

class ContentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cols: null,
      rows: null,
      values: [],
      step: 1,
      shuffledValues: [],
      openedCards: [],
    }
  }

  handleNextStep = () => {
    if (this.state.step + 1 === 3 && this.state.shuffledValues.length === 0) {
      this.setState({
        step: this.state.step + 1,
        shuffledValues: _.shuffle(this.state.values),
        openedCards: [],
      }, () => {
        localStorage.setItem('values', this.state.shuffledValues);
        localStorage.setItem('opened', []);
      });
    } else {
      this.setState({
        step: this.state.step + 1,
      });
    }
  }

  handleResume = () => {
    this.setState({
      shuffledValues: localStorage.getItem('values').split(","),
      rows: localStorage.getItem('rows'),
      cols: localStorage.getItem('cols'),
      openedCards: localStorage.getItem('opened').split(",").map(el => parseInt(el)),
    }, () => {
      this.setState({
        step: 3,
      })
    });
  }

  render() {
    if (this.state.step === 1) {
      return <StepOne setColsAndRows={(cols, rows) => this.setState({ cols, rows }, () => this.handleNextStep())} resume={this.handleResume} />;
    }

    if (this.state.step === 2) {
      return <StepTwo setValues={(values) => this.setState({ values }, () => this.handleNextStep())} valuesCount={this.state.rows * this.state.cols} />;
    }

    if (this.state.step === 3) {
      return <StepThree cols={this.state.cols} rows={this.state.rows} values={this.state.shuffledValues} openedCards={this.state.openedCards} />
    }

    return (
      <Button type="primary" onClick={() => this.setState({ step: 1 })}>Reset</Button>
    );
  }
}

export default ContentContainer;
