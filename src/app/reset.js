import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import HeaderLayout from '../layout/header-layout';
import UserStore from '../stores/user-store';
import Message from '../components/message';
import Form from '../components/form';
import Label from '../components/label';
import Input from '../components/input';
import Button from '../components/button';
import Base from '../base';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      message: ''
    };
  }

  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  handleClick = (e) => {
    e.preventDefault();
    const password = this.password.get('value');
    const code = this.props.location.query.oobCode;
    if (password.length === 0 || !code) {
      return;
    }
    Base.auth().confirmPasswordReset(code, password).then((res) => {
      if (!res) {
        return this.setState({
          message: 'Your password has been reset!'
        });
      }
      if (res.code) {
        this.setState({
          message: res.message
        });
      }
    }).catch((e) => {
      this.setState({
        message: e.message
      })
    });
  }

  render() {
    const headerStyle = {
      backgroundImage: 'url(../assets/purple_1.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
    let messageHtml;
    if (this.state.message) {
      messageHtml = (
        <Message type="error">
          {this.state.message}
        </Message>
      );
    }
    return (
      <HeaderLayout style={headerStyle} centered>
        <Form>
          <h1 style={{ marginBottom: 16 }}>Reset Password</h1>
          {messageHtml}
          <Input ref={(c) => { this.password = c; }} type={'password'} name={'password'} placeholder={'new password'}/>
          <Button type="primary" onClick={this.handleClick}>Reset</Button>
        </Form>
      </HeaderLayout>
    );
  }
}

export default connectToStores(Reset);

