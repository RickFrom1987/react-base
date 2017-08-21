import React, {Component} from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import MenuLayout from '../layout/menu-layout';
import HeaderLayout from '../layout/header-layout';
import CenteredLayout from '../layout/centered-layout';
import Button from '../components/button';

import * as Colors from '../constants/colors';
import '../background.styl';

class Home extends Component {

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

  render() {
    const {user, ...props} = this.props;
    const homeStyle = {
      backgroundColor: Colors.PURPLE,
      backgroundImage: 'url(../assets/purple_1.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      color: Colors.WHITE
    };
// <div className="row">
//   <div className="col-sm-6">
//     <h2>Easy.</h2>
//     <p>Upload a spreadsheet, then share the project url with anyone.</p>
//   </div>
//   <div className="col-sm-6">
//     <h2>Flexible.</h2>
//     <p>Turn your spreadsheet into a awesome charts, graphs and maps!</p>
//   </div>
// </div>
    return (
      <MenuLayout>
        <HeaderLayout user={user} style={homeStyle} centered>
          <div className="row" style={{ marginBottom: 36 }}>
            <div className="col-sm-12">
              <h1 style={{ fontSize: 48, marginBottom: 12 }}>TRANSFORM</h1>
              <p style={{ 
                fontSize: 24
              }}>Transform is an online tool for product, marketing or financial professionals that helps bring boring spreadsheets to life.</p>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 100 }}>
            <div className="col-sm-12">
              <Button to={'/create'} type="hero" inline style={{ marginRight: 12 }}>Create A Project</Button>
            </div>
          </div>
        </HeaderLayout>
      </MenuLayout>
    );
  }
}

export default connectToStores(Home);
