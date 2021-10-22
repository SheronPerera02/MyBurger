import React, { Component } from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        dirty: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        dirty: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  onChangeHandler = (key, event) => {
    const updatedControls = updateObject(this.state.controls, {
      [key]: updateObject(this.state.controls[key], {
        value: event.target.value,
        isValid: checkValidity(
          event.target.value,
          this.state.controls[key].validation
        ),
        dirty: true,
      }),
    });

    // const updatedControls = {
    //   ...this.state.controls,
    //   [key]: {
    //     ...this.state.controls[key],
    //     value: event.target.value,
    //     isValid: this.checkValidity(
    //       event.target.value,
    //       this.state.controls[key].validation
    //     ),
    //     dirty: true,
    //   },
    // };

    this.setState({ controls: updatedControls });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.onSubmit(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  onSwitchIsSignupHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    let inputs = [];

    for (const key in this.state.controls) {
      inputs.push(
        <Input
          key={key}
          elementType={this.state.controls[key].elementType}
          elementConfig={this.state.controls[key].elementConfig}
          value={this.state.controls[key].value}
          isValid={this.state.controls[key].isValid}
          shouldValidate={this.state.controls[key].validation}
          dirty={this.state.controls[key].dirty}
          change={this.onChangeHandler.bind(this, key)}
        />
      );
    }

    if (this.props.loading) {
      inputs = (
        <div style={{ textAlign: 'center' }}>
          <Spinner />
        </div>
      );
    }

    let errorMessage = null;

    if (this.props.error) {
      console.log(this.props.error);
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitForm}>
          {inputs}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        <Button btnType='Danger' clicked={this.onSwitchIsSignupHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onSubmit: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Auth);
