import React, {Component} from 'react';
import Button from './button';
import {WHITE, GREY} from '../constants/colors';

const DEFAULT_STYLE = {
  padding: 12,
  backgroundColor: WHITE,
  display: 'inline-block',
  width: '100%',
  fontSize: 16,
  marginTop: 12,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: GREY,
  borderRadius: 6
};

class SaveCancel extends Component {
  static propTypes = {
    handleCancel: React.PropTypes.func,
    handleSave: React.PropTypes.func,
    style: React.PropTypes.object
  }

  static defaultProps = {
    handleCancel: () => {},
    handleSave: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleSave = (e) => {
    this.props.onSave(e);
  }

  handleCancel = (e) => {
    this.props.onCancel(e);
  }

  render() {
    const {style, onSave, onCancel, ...props} = this.props;
    const saveCancelStyle = Object.assign({}, style);
    let saveStyle = {
      marginRight: 6
    };
    let saveHtml;
    if (onSave) {
      saveHtml = (
        <Button type="secondary" style={saveStyle} onClick={this.handleSave} inline>
          <i className="fa fa-thumbs-o-up" style={{ marginRight: 6 }}/>Save
        </Button>
      );
    }
    return (
      <div style={saveCancelStyle}>
        {saveHtml}
        <Button type="secondary" onClick={this.handleCancel} inline>Cancel</Button>
      </div>
    );
  }
}

export default SaveCancel;
