import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import Base from '../base';
import Button from './button';
import {WHITE} from '../constants/colors';

const TEXT_SIZE = 60;
const MAX_WIDTH = 600;

class Title extends Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
    style: React.PropTypes.object
  }

  static defaultProps = {
    onSelect: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      focus: false,
      inputWidth: TEXT_SIZE
    };
  }

  handleClick = () => {
    this.setState({
      showInput: !this.state.showInput
    }, () => {
      this.input.focus();
    });
  }

  handleKeyDown = (e) => {
    const value = e.target.value;
    const w = value.length * TEXT_SIZE;
    if (w > MAX_WIDTH) {
      return;
    }
    this.setState({
      inputWidth: w
    });
  }

  handleFocus = () => {
    this.setState({
      focus: true,
    });
  }

  handleBlur = (e) => {
    const value = e.target.value;
    if (value.trim().length === 0) {
      this.setState({
        showInput: false
      });
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.props.onSelect(e.target.value);
    if (value.length === 0) {
      return this.setState({
        showInput: false
      });
    }
  }

  render() {
    const {onSelect, value, style, ...props} = this.props;
    const containerStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      alignItems: 'center',
      justifyContent: 'flex-start',
      zIndex: 2
    };
    let placeHolder = '';
    let titleHtml;
    if (!this.state.showInput && !value) {
      const hintStyle = {
        marginLeft: 6,
        flexGrow: 0,
        fontSize: 10,
        padding: 6,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.25)',
        textTransform: 'uppercase',
        justifyContent: 'flex-start',
        alignItems: 'center'
      };
      titleHtml = (
        <View row style={{ alignItems: 'center' }}>
          <Button type="circle" size={36} onClick={this.handleClick}>
            <i className="fa fa-pencil"/>
          </Button>
          <View row style={hintStyle}>
            Add title
          </View>
        </View>
      );
    } else {
      // unique styled title input
      const inputStyle = {
        outline: 0,
        border: 0,
        background: 'none',
        textAlign: 'center',
        fontSize: TEXT_SIZE,
        minWidth: TEXT_SIZE * 2,
        maxWidth: MAX_WIDTH,
        textTransform: 'uppercase',
        color: WHITE,
        width: 'auto',
        fontWeight: 700,
        padding: 6
      };
      titleHtml = (
        <input
          ref={(c) => { this.input = c; }} 
          placeholder={placeHolder}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          style={inputStyle}
          value={value}/>
      );
    }
    return (
      <View column style={containerStyle}>
        {titleHtml}
      </View>
    );
  }
}

export default Title;
