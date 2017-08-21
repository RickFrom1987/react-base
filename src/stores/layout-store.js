import alt from '../alt';
import throttle from 'lodash/throttle';

import LayoutActions from '../actions/layout-actions';

const BREAKPOINTS = {
  extra_small: 320, // iPhone portrait
  small: 480,       // iPhone landscape
  medium: 768,      // iPad portrait
  large: 992,       // iPad landscape
  huge: 1200,       // 'wide website'
};

class LayoutStore {
  constructor() {
    this.bindListeners({
      handleUpdateLayout: LayoutActions.UPDATE_LAYOUT
    });
    this.state = Object.assign({}, {
      layout : {
        showSideBar: false,
        showMenu: false
      }
    }, this._getWindow());
    window.addEventListener('resize', this._update);
  }

  _getWindow = () => {
    const w = {
      height: {
        value: window.innerHeight,
      },
      width: {
        value: window.innerWidth,
        lessThan: {},
        greaterThan: {}
      }
    };

    Object.entries(BREAKPOINTS).forEach(([name, value]) => {
      w.width.lessThan[name] = w.width.value < value;
      w.width.greaterThan[name] = w.width.value > value;
    });

    return {
      height: w.height,
      width: w.width
    };
  }

  _update = throttle(() => {
    this.setState(this._getWindow());
  }, 250);

  handleUpdateLayout(update) {
    const layout = this.state.layout;
    const updateLayout = Object.assign({}, layout, update);
    console.log("layout", this.state);
    this.setState({ layout : updateLayout });
  }

}

export default alt.createStore(LayoutStore, 'LayoutStore');