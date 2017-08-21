import React, {Component} from 'react';
import * as Colors from '../constants/colors';

const DEFAULT_STYLE = {
  padding: 12,
  backgroundColor: Colors.WHITE,
  display: 'inline-block',
  width: '100%',
  fontSize: 12,
  marginTop: 12,
  marginBottom: 12,
  border: `1px solid ${Colors.GREY_1}`,
  color: Colors.TEXT_DARK
};

class Input extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    style: React.PropTypes.object,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    type: 'text',
    name: 'input',
    value: '',
    placeholder: 'placeholder',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {}
  }

  constructor(props) {
    super(props);
    this.input = null;
    this.state = {
      value: ''
    };
  }
  
  get = (field) => {
    return this.state[field];
  }

  handleBlur = (e) => {
    e.preventDefault();
    this.props.onBlur(e);
  }

  handleFocus = (e) => {
    e.preventDefault();
    this.props.onFocus(e);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
  }

  select = () => {
    this.input.select();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const {value, type, name, placeholder, readOnly, style, ...props} = this.props;
    let val;
    if (value) { 
      val = value;
    } else {
      val = this.state.value;
    }
    const inputStyle = Object.assign({}, DEFAULT_STYLE, style);
    return (
      <input
        ref={(c) => { this.input = c; }}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        type={type}
        name={name}
        value={val}
        placeholder={placeholder}
        style={inputStyle}
        readOnly={readOnly}/>
    );
  }
}

export default Input;
