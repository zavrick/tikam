import React from 'react';
import { Form, InputNumber, Button } from 'antd';

class StepOne extends React.Component {
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

      localStorage.setItem('cols', attributes.cols);
      localStorage.setItem('rows', attributes.rows);

      this.props.setColsAndRows(attributes.cols, attributes.rows);

      return true;
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const values = localStorage.getItem('values');

    return (
      <div>
        {
          values &&
            <div>
              <Button type="primary" onClick={this.props.resume} style={{ marginBottom: 15 }}>RESUME last set</Button>
              <hr/>
            </div>
        }

        <h1>Set Board Size</h1>
        <Form>
          <Form.Item label="No. of Columns">
            {getFieldDecorator('cols', {
              rules: [
                {
                  required: true,
                  message: 'Please input a number',
                },
              ],
            })(
              <InputNumber step={1} min={1} placeholder="" />
            )}
          </Form.Item>
          <Form.Item label="No. of Rows">
            {getFieldDecorator('rows', {
              rules: [
                {
                  required: true,
                  message: 'Please input a number',
                },
              ],
            })(
              <InputNumber step={1} min={1} placeholder="" />
            )}
          </Form.Item>
        </Form>
        <Button type="primary" onClick={this.handleSubmit}>
          NEW set
        </Button>
      </div>
    );
  }
}

export default Form.create()(StepOne);
