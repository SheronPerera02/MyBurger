import React from 'react';

import burgerLogo from '../../assets/images/26.1 burger-logo.png.png';

import classes from './Logo.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='MyBurger' />
  </div>
);

export default logo;
