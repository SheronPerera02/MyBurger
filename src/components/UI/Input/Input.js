import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;

  let inputElementClasses = [classes.InputElement];

  if (!props.isValid && props.shouldValidate && props.dirty) {
    inputElementClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputElementClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputElementClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputElementClasses.join(' ')}
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputElementClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
