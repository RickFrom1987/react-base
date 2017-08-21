import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'
import {browserHistory} from 'react-router';
import View from 'react-flexbox';
import {Link} from 'react-router';
import Base from '../base';
import BackgroundPreview from './background-preview';
import Overlay from './overlay'
import Input from './input';
import Button from './button';
import PulsateDot from '../components/pulsate-dot';

import '../background.styl';
import * as Colors from '../constants/colors';

class ProjectPreview extends Component {
  static propTypes = {
    project: React.PropTypes.object,
    onDelete: React.PropTypes.func,
  }

  static defaultProps = {
    onDelete: () => {}
  }

  constructor(props) {
    super(props);
    this.urlInput = null;
    this.state = {
      file: {},
      showOverlay: false
    };
  }

  componentDidMount = () => {
    const project = this.props.project;
    this.fileRef = Base.syncState(`files/${project.fid}`, {
      context: this,
      state: 'file'
    });
  }

  handleClick = (key) => {
    const url = `/${key}`;
    const win = window.open(url, '_blank');
    win.focus();
  }
  
  handleDeleteClick = (key) => {
    this.props.onDelete(key);
  }

  handleDownloadClick = (url) => {
    const win = window.open(url, '_blank');
    win.focus();
  }

  handleInputFocus = (e) => {
    e.preventDefault();
    this.urlInput.select();
  }

  handleMouseOver = (e) => {
    e.preventDefault();
    this.setState({
      showOverlay: true
    });
  }

  handleMouseLeave = (e) => {
    e.preventDefault();
    this.setState({
      showOverlay: false
    });
  }

  renderInput = () => {
    const project = this.props.project;
    return (
      <Input 
        ref={(c) => { this.urlInput = c; }}
        value={`${HOST}/${project.key}`}
        onFocus={this.handleInputFocus}
        style={{
          margin: 0,
          padding: 6,
          fontSize: 12
        }}/>
    );
  }

  render = () => {
    const {project, onDelete, ...props} = this.props;
    const file = this.state.file;
    const containerStyle = {
      borderRadius: 6,
      marginTop: 12,
      marginBottom: 12,
      padding: 12,
      width: '100%',
      border: `1px solid ${Colors.GREY_1}`,
    };

    const buttonStyle = {
      marginLeft: 6,
      alignSelf: 'flex-end'
    };

    const sectionStyle = {
      padding: 6,
      fontSize: 12,
      lineHeight: '32px',
      alignItems: 'center',
      justifyContent: 'flex-start'
    };
    return (
      <div
        className="bg-box-shadow"
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        style={containerStyle}>
        <View row style={sectionStyle}>
          <PulsateDot working={project.working}/>
          <h2 style={{ margin: 0 }}>{file.displayText}</h2>
          <Button
            type="circle"
            size={28}
            to={`/edit/${project.key}`}
            style={buttonStyle}
            data-tip="Edit">
              <i className="fa fa-pencil"></i>
          </Button>
          <Button
            type="circle"
            size={28}
            onClick={this.handleDeleteClick.bind(this, project.key)}
            style={buttonStyle}
            data-tip="Delete">
            <i className="fa fa-trash-o"></i>
          </Button>
        </View>
        <View row style={sectionStyle}>
          {this.renderInput()}
          <Button
            type="circle"
            size={28}
            onClick={this.handleClick.bind(this, project.key)}
            style={buttonStyle}
            data-tip="Open project">
            <i className="fa fa-arrow-circle-o-right"></i>
          </Button>
          <Button
            type="circle"
            size={28}
            onClick={this.handleDownloadClick.bind(this, file.url)}
            style={buttonStyle}
            data-tip="Download source file">
            <i className="fa fa-cloud-download"></i>
          </Button>
        </View>
        <ReactTooltip/>
      </div>
    );
  }
}

export default ProjectPreview;
