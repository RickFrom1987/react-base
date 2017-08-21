import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import * as Colors from '../constants/colors';
import './button.styl';

const DEFAULT_STYLE = {
  cursor: 'pointer',
  outline: 0,
  border: 0
};

const BUTTON_TYPES = {
  primary: {
    backgroundImage: `linear-gradient(135deg, ${Colors.PURPLE} , ${Colors.BLUE})`,
    backgroundColor: Colors.BLUE,
    borderColor: Colors.BLUE,
    borderRadius: 4,
    borderStyle: 'solid',
    minWidth: 100,
    minHeight: 32,
    fontSize: 12,
    color: Colors.WHITE,
    textTransform: 'uppercase'
  },
  secondary: {
    background: 'none',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderStyle: 'solid',
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 75,
    minHeight: 32,
    fontSize: 12,
    color: Colors.WHITE,
    textTransform: 'uppercase'
  },
  circle: {
    display:'block',
    border: `2px solid ${Colors.WHITE}`,
    borderRadius: '50%',
    textAlign:'center',
    textDecoration:'none',
    backgroundImage: `linear-gradient(135deg, ${Colors.PURPLE} , ${Colors.BLUE})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: `0 0 4px ${Colors.GREY_2}`,
    width: 24,
    height: 24,
    color: Colors.WHITE,
  },
  hero: {
    backgroundColor: Colors.PINK,
    borderColor: Colors.PINK,
    borderRadius: 4,
    borderStyle: 'solid',
    fontSize: 12,
    padding:'12px 48px',
    color: Colors.WHITE,
    textTransform: 'uppercase'
  }
};

const HOVER_STYLE = {
  primary: {
    backgroundImage: `linear-gradient(270deg, ${Colors.PURPLE} , ${Colors.BLUE})`,
    backgroundColor: Colors.BLUE,
  },
  secondary: {
    background: 'rgba(255,255,255, 0.25)'
  }
};

class Button extends Component {
  static propTypes = {
    inline: React.PropTypes.bool,
    to: React.PropTypes.string,
    type: React.PropTypes.string,
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    to: null,
    onClick: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      to: '',
      hover: false,
    };
  }

  handleClick = (e) => {
    const to = this.props.to;
    if (to) {
      browserHistory.push(to);
      return;
    }
    this.props.onClick(e);
  }

  handleMouseOver = (e) => {
    e.preventDefault();
    this.setState({
      hover: true
    });
  }

  handleMouseLeave = (e) => {
    e.preventDefault();
    this.setState({
      hover: false
    });
  }

  render() {
    const {inline, to, type, style, size, children, onClick, ...props} = this.props;
    let buttonStyle;
    if (type) {
      buttonStyle = Object.assign({}, DEFAULT_STYLE, BUTTON_TYPES[type])
    } else {
      buttonStyle = DEFAULT_STYLE;
    }

    if (size) {
      buttonStyle = Object.assign({}, buttonStyle, { 
        width: size,
        height: size,
        fontSize: (size / 2)
      });
    }

    if (this.state.hover) {
      buttonStyle = Object.assign({}, buttonStyle, HOVER_STYLE[type]);
    }

    buttonStyle = Object.assign({}, buttonStyle, style);
    
    let animClass;
    if (type === 'circle') {
      animClass = 'button-primary';
    }

    let positionStyle;
    if (inline) {
      positionStyle = Object.assign({}, {
        display: 'inline-block'
      });
    }
    return (
      <div {...props} style={positionStyle} onClick={this.handleClick}>
        <button
          className={animClass}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
          style={buttonStyle}
           {...props}>
            {children}
        </button>
      </div>
    );
  }
}

export default Button;
