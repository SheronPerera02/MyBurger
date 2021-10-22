import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];

  for (let key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }

  const convertedIngredients = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '7px',
          margin: '0 8px',
        }}
      >
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients : {convertedIngredients}</p>
      <p>
        Price : <strong>USD {props.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
