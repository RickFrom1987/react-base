import React, {Component} from 'react';
import View from 'react-flexbox';
import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import Base from '../base';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  componentDidMount = () => {
    const pid = this.props.params.pid;
    const user = this.props.user;
    Base.syncState(`projects/${pid}`, {
      context: this,
      state: 'project'
    });
    Base.syncState(`json`, {
      context: this,
      state: 'json',
      queries: {
        orderByChild: 'pid',
        equalTo: pid
      }
    });
  }

  render = () => {
    const project = this.state.project;
    const json = this.state.json;
    if (!project || !json) {
      return null;
    }
    const containerStyle = {
      height: '100vh',
      width: '100vw'
    };
    return (
      <div style={containerStyle}>
        Project Page
      </div>
    );
  }
}

export default connectToStores(Project);
