import React, {Component} from 'react';
import View from 'react-flexbox';
import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import HeaderLayout from '../layout/header-layout';
import HeroLayout from '../layout/hero-layout';
import Message from '../components/message';
import Form from '../components/form';
import Label from '../components/label';
import Input from '../components/input';
import Button from '../components/button';
import Base from '../base';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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

  _handleReset = (e) => {
    if (e) {
      return this.setState({
        message: e.message
      });
    }
    const email = this.email.get('value');
    return this.setState({
      message: `A email has been sent to ${email}`
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const email = this.email.get('value');
    if (email.length === 0) {
      return;
    }
    // Reset Password
    Base.resetPassword({
      email: email
    }, this._handleReset);
  }

  render() {
    const headerStyle = {
      backgroundImage: 'url(../assets/purple_1.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
    return (
      <HeaderLayout centered style={headerStyle}>
        <Form>
          <h1 style={{ marginBottom: 16 }}>Forgot Password</h1>
          <Message type="error">{this.state.message}</Message>
          <Label>e-mail</Label>
          <Input ref={(c) => { this.email = c; }} type={'text'} name={'email'} placeholder={'example@domain.com'}/>
          <Button type="primary" onClick={this.handleClick}>Reset</Button>
        </Form>
      </HeaderLayout>
    );
  }
}

export default connectToStores(Forgot);
