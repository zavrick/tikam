import React from 'react';
import { Form, Input, InputNumber, Button, Switch } from 'antd';
import _ from 'lodash';

class StepTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simpleMode: false,
      error: '',
      valueGroups: [
        { id: 1, value: '', quantity: 0 },
      ],
    }

    this.handleAdvancedInputValueChange = this.handleAdvancedInputValueChange.bind(this);
    this.handleAdvancedInputQtyChange = this.handleAdvancedInputQtyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdvancedInputValueChange = (id) => e => {
    const value = e.target.value;

    const newGroups = this.state.valueGroups.map((group) => {
      return group.id === id ? { id, value, quantity: group.quantity } : group;
    })

    this.setState({
      valueGroups: newGroups,
    });
  }

  handleAdvancedInputQtyChange = (id) => value => {
    const newGroups = this.state.valueGroups.map((group) => {
      return group.id === id ? { id, value: group.value, quantity: value } : group;
    })

    this.setState({
      valueGroups: newGroups,
    });
  }

  handleAddAdvancedInput = () => {
    const valueGroupsArray = this.state.valueGroups;

    this.setState({
      valueGroups: valueGroupsArray.concat({ id: valueGroupsArray.length + 1, value: '', quantity: 0 }),
    });
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }

      if (this.state.simpleMode) {
        const attributes = this.props.form.getFieldsValue();

        this.props.setValues(Object.values(attributes))
      } else {
        let valuesArray = [];

        this.state.valueGroups.forEach((valueGroup) => {
          return _.times(valueGroup.quantity, () => {
            return valuesArray = valuesArray.concat(valueGroup.value);
          })
        })

        const providedCount = valuesArray.length;
        const valuesCount = this.props.valuesCount;
        if (providedCount === valuesCount) {
          this.props.setValues(valuesArray);
        } else {
          this.setState({ error: `Need ${valuesCount}, provided ${providedCount}` })
          return false;
        }
      }

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
          <Input type="text" size="small" placeholder="" style={{ width: 200 }} />
        )}
      </Form.Item>
    );
  }

  renderForm = () => {
    if (!this.state.simpleMode) {
      const inputs = this.state.valueGroups.map((valueType) => {
        return (
          <div style={{ marginBottom: 16 }} key={valueType.id}>
            <span style={{ marginRight: 20 }}>
              <label>Value: </label>
              <Input type="text" size="default" placeholder="" onChange={this.handleAdvancedInputValueChange(valueType.id)}  style={{ width: 200 }} />
            </span>
            <span>
              <label>Quantity: </label>
              <InputNumber min={1} placeholder="" onChange={this.handleAdvancedInputQtyChange(valueType.id)} />
            </span>
          </div>
        );
      })
      return (
        <div>
          {inputs}
          {
            this.state.error &&
              <div style={{ color: 'red' }}>{this.state.error}</div>
          }
          <Button onClick={this.handleAddAdvancedInput} style={{ marginBottom: 20 }}>
            Add another set
          </Button>
        </div>
      )
    }

    return (
      <Form>
        {
          _.times(this.props.valuesCount, (i) => {
            return (
              this.renderField(i)
            );
          })
        }
      </Form>
    );
  }

  render() {
    return (
      <div>
        <h1>Set Card Values</h1>
        <Switch
          defaultChecked
          checkedChildren="Bulk"
          unCheckedChildren="Simple"
          onChange={() => this.setState({ simpleMode: !this.state.simpleMode })}
          style={{ marginBottom: 20 }}
        />
        {this.renderForm()}
        <Button type="primary" onClick={this.handleSubmit}>
          NEXT
        </Button>
      </div>
    );
  }
}

export default Form.create()(StepTwo);
