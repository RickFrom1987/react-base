import alt from '../alt';

class UserActions {
  updateUser(user) {
    console.log('updateUseraction', user);
    return user;
  }
}

export default alt.createActions(UserActions);