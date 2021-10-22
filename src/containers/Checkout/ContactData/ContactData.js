import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    formData: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        dirty: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        dirty: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        dirty: false,
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
        dirty: false,
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        dirty: false,
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    let orderData = {};

    for (const key in this.state.formData) {
      orderData[key] = this.state.formData[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData,
      userId: this.props.userId,
    };

    this.props.onPurchaseBurger(order, this.props.token);
  };

  onChangeHandler = (key, event) => {
    let formData = updateObject(this.state.formData, {
      [key]: updateObject(this.state.formData[key], {
        value: event.target.value,
        isValid: checkValidity(
          event.target.value,
          this.state.formData[key].validation
        ),
        dirty: true,
      }),
    });

    // let formData = { ...this.state.formData };

    // let updatedInput = { ...formData[key], value: event.target.value };

    // updatedInput.isValid = this.checkValidity(
    //   updatedInput.value,
    //   updatedInput.validation
    // );

    // updatedInput.dirty = true;

    // formData[key] = updatedInput;

    let formIsValid = true;

    for (let key in formData) {
      if (formData[key].isValid !== undefined) {
        formIsValid = formData[key].isValid && formIsValid;
      }
    }

    this.setState({ formData, formIsValid });
  };

  render() {
    let inputs = [];

    for (const key in this.state.formData) {
      inputs.push(
        <Input
          key={key}
          elementType={this.state.formData[key].elementType}
          elementConfig={this.state.formData[key].elementConfig}
          value={this.state.formData[key].value}
          isValid={this.state.formData[key].isValid}
          shouldValidate={this.state.formData[key].validation}
          dirty={this.state.formData[key].dirty}
          change={this.onChangeHandler.bind(this, key)}
        />
      );
    }

    let form = (
      <Aux>
        <h1>Enter your contact data</h1>
        <form onSubmit={this.orderHandler}>
          {inputs}
          <Button btnType='Success' disable={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      </Aux>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (order, token) =>
      dispatch(actions.purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
