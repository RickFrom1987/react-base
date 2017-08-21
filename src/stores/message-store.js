import alt from '../alt';
import MessageActions from '../actions/message-actions';

class MessageStore {
  constructor() {
    this.bindListeners({
      handleUpdateMessage: MessageActions.UPDATE_MESSAGE
    });
    this.state = this._getInitialState();
  }

  _getInitialState = () => {
    return {
      message: {
        text: null,
        type: null
      }
    };
  }

  handleUpdateMessage(update) {
    const message = this.state.message;
    const updateMessage = Object.assign({}, message, update);
    this.setState({message: updateMessage});
    setTimeout(() => {
      this.setState(this._getInitialState());
    }, 3000);
  }

}

export default alt.createStore(MessageStore, 'MessageStore');