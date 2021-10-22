import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    opened: false,
  };

  closeHandler = () => {
    this.setState({ opened: false });
  };

  openHandler = () => {
    this.setState({ opened: true });
  };

  render() {
    return (
      <Aux>
        <Toolbar clicked={this.openHandler} isAuth={this.props.isAuth} />
        <SideDrawer
          clicked={this.closeHandler}
          open={this.state.opened}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
