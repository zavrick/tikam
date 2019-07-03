import React from 'react';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';

class StepTwo extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }

      const attributes = this.props.form.getFieldsValue();

      this.props.setValues(Object.values(attributes))
      this.props.nextStep();

      return true;
    });
  }

  renderField = (i) => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form.Item label={`Value ${i + 1}`} key={i}>
        {getFieldDecorator(`value-${i}`, {
          rules: [
            {
              required: true,
              message: 'Please input something',
            },
          ],
        })(
          <Input type="text" size="small" placeholder="" />
        )}
      </Form.Item>
    );
  }

  render() {
    return (
      <div>
        <h1>Set Card Values</h1>
        <Form>
          {
            _.times(this.props.valuesCount, (i) => {
              return (
                this.renderField(i)
              );
            })
          }
        </Form>
        <Button type="primary" onClick={this.handleSubmit}>
          NEXT
        </Button>
      </div>
    );
  }
}

export default Form.create()(StepTwo);
