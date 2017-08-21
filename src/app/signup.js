import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import View from 'react-flexbox';
import {Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import UserActions from '../actions/user-actions';
import HeaderLayout from '../layout/header-layout';
import HeroLayout from '../layout/hero-layout';
import Message from '../components/message';
import Form from '../components/form';
import Label from '../components/label';
import Input from '../components/input';
import Button from '../components/button';
import Base from '../base';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }

  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    const userState = UserStore.getState();
    return {
      user: userState.user
    }
  }

  _createHandler = (e, user) => {
    if (e) {
      return this.setState({
        message: e.message
      });
    }
    if (!user || typeof user === 'undefined') {
      return this.setState({
        message: 'User not created'
      });
    }
    Base.post(`users/${user.uid}`, {
      data: {
        displayName: user.email,
        email: user.email,
        photoUrl: ''
      }
    }).then(() => {
      this.setState({
        message: `Thanks for joining ${user.email}`
      });
      UserActions.updateUser(user);
      return browserHistory.push('/profile');
    }).catch(err => {
      return this.setState({
        message: 'Something went wrong'
      });
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const email = this.email.get('value');
    const password = this.password.get('value');
    if (email.length === 0 || password.length === 0) {
      return;
    }
    Base.createUser({
      email: email,
      password: password
    }, this._createHandler);
  }

  render() {
    const headerStyle = {
      backgroundImage: 'url(../assets/purple_1.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
    return (
      <HeaderLayout style={headerStyle} centered>
        <Form>
          <h1 style={{ marginBottom: 16 }}>Sign Up</h1>
          <Message type="error">{this.state.message}</Message>
          <Label>e-mail</Label>
          <Input ref={(c) => { this.email = c; }} type={'text'} name={'email'} placeholder={'email'}/>
          <Label>password</Label>
          <Input ref={(c) => { this.password = c; }} type={'password'} name={'password'} placeholder={'password'}/>
          <View row style={{ alignItems: 'center' }}>
            <Button type="primary" onClick={this.handleClick}>Sign Up</Button>
            <Link to={'/login'}>Already have an account?</Link>
          </View>
        </Form>
      </HeaderLayout>
    );
  }
}

export default connectToStores(Signup);

