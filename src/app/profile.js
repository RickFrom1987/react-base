import React, {Component} from 'react';
import View from 'react-flexbox';
import {Grid, Row, Column} from 'react-cellblock';
import ProjectPreview from '../components/project-preview';
import MenuLayout from '../layout/menu-layout';
import HeaderLayout from '../layout/header-layout';
import HeroLayout from '../layout/hero-layout';
import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import MessageStore from '../stores/message-store';
import MessageActions from '../actions/message-actions';
import Base from '../base';
import Button from '../components/button';
import * as Colors from '../constants/colors';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.state = {
      projects: []
    };
  }

  static getStores() {
    return [UserStore, MessageStore];
  }

  static getPropsFromStores() {
    const userState = UserStore.getState();
    const messageState = MessageStore.getState();
    return {
      user: userState.user,
      message: messageState.messages
    }
  }

  componentDidMount = () => {
    const user = this.props.user;
    this.projectsRef = Base.syncState(`projects`, {
      context: this,
      state: 'projects',
      asArray: true,
      queries: {
        orderByChild: 'uid',
        equalTo: user.uid
      }
    });
  }

  handleDelete = (key) => {
    Base.remove(`projects/${key}`);
  }

  renderBlocks = () => {
    const projects = this.props.projects;
    const columnsHtml = projects.map((p,i) => {
      return (
        <Column width="1/2" key={i}>
          <ProjectPreview project={p}/>
        </Column>
      )
    });
    const rowsHtml = columnsHtml.map((elem,i, arr) => {
      return [elem, (i+1 < arr.length) ? arr[i+1] : null];
    }).filter((elem,i) => {
      return !(i % 2);
    });
    return rowsHtml;
  }

  renderUserName = () => {
    const user = this.props.user;
    let name = user.email;
    if (user.displayName) {
      name = user.displayName;
    }
    return name;
  }

  renderProjectsTitle = () => {
    const projects = this.state.projects;
    if (projects.length > 0) {
      return `${projects.length} Projects`;
    } else if (projects.length === 0) {
      return `No Projects yet.`;
    }
  }

  render() {
    const { user } = this.props;
    const projects = this.state.projects;
    let username;
    if (user) {
      username = this.renderUserName();
    }
    const title = this.renderProjectsTitle();
    let rowsHtml;
    if (projects.length > 0) {
      rowsHtml = projects.map((p, i) => {
        return (
          <div className="row" key={i}>
            <ProjectPreview
              project={p}
              onDelete={this.handleDelete}/>
          </div>
        );
      });
    }
    const subheaderHtml = (
      <View row style={{ alignItems: 'center' }}>
        <p>Hi {username} you have {projects.length} projects created so far.</p>
        <Button
          to={'/create'}
          type="primary">
          Create new project
        </Button>
      </View>
    );
    return (
      <MenuLayout>
        <HeaderLayout user={user} subheader={subheaderHtml}>
          <div className="container">
            {rowsHtml}
          </div>
        </HeaderLayout>
      </MenuLayout>
    );
  }
}

export default connectToStores(Profile);
