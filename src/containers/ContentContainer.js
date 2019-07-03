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
    }
  }

  componentDidMount = () => {
    this.setState({ shuffledValues: _.shuffle(this.state.values) });
  }

  handleNextStep = () => {
    this.setState({
      step: this.state.step + 1,
    });
  }

  render() {
    if (this.state.step === 1) {
      return <StepOne nextStep={this.handleNextStep} setColsAndRows={(cols, rows) => this.setState({ cols, rows })} />;
    }

    if (this.state.step === 2) {
      return <StepTwo nextStep={this.handleNextStep} setValues={(values) => this.setState({ values })} valuesCount={this.state.rows * this.state.cols} />;
    }

    if (this.state.step === 3) {
      return <StepThree cols={this.state.cols} rows={this.state.rows} values={this.state.shuffledValues} />
    }

    return (
      <Button type="primary" onClick={() => this.setState({ step: 1 })}>Reset</Button>
    );
  }
}

export default ContentContainer;
