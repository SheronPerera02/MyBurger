import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total price is : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            addFn={() => props.addFn(ctrl.type)}
            removeFn={() => props.removeFn(ctrl.type)}
            disable={props.ingredientInfo[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? 'ORDER NOW' : 'SIGNUP TO ORDER'}
      </button>
    </div>
  );
};

export default buildControls;
