import alt from '../alt';
import UserActions from '../actions/user-actions';

class UserStore {
  constructor() {
    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER
    });
    this.state = this._getInitialState();
  }

  _getInitialState = () => {
    return {
      user: {}
    };
  }

  handleUpdateUser(user) {
    this.setState({user: user});
  }

}

export default alt.createStore(UserStore, 'UserStore');