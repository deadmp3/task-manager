import React from 'react';
import { FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import cn from 'classnames';
import { DropdownList } from 'react-widgets';

const renderList = ({
  input: { onChange, value },
  className,
  valueField = 'value',
  textField = 'text',
  ...props
}) => (
  <DropdownList
    className={cn(className, 'p-0')}
    onChange={onChange}
    value={value}
    valueField={valueField}
    textField={textField}
    {...props}
  />);

const fieldComponent = (type) => {
  if (type === 'list') {
    return renderList;
  }
  if (type === 'email' || type === 'password') {
    return 'input';
  }
  if (type) {
    return type;
  }
  return 'input';
};

const fieldType = (type) => {
  if (type === 'list') {
    return 'text';
  }
  return type || 'text';
};

export default class _Field extends React.Component {
  renderErrorMsg = (msg) => {
    if (!msg) {
      return null;
    }
    return (
      <div className="invalid-feedback">{msg}</div>
    );
  };

  render() {
    const {
      className,
      name,
      type,
      err,
    } = this.props;
    const fieldClass = cn({
      'form-control': true,
      'is-invalid': !!err,
    });
    return (
      <FormGroup key={name} className={className}>
        <Field
          {...this.props}
          className={fieldClass}
          component={fieldComponent(type)}
          type={fieldType(type)}
        />
        {this.renderErrorMsg(err)}
      </FormGroup>);
  }
}
