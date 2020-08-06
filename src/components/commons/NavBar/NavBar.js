import React, { Component } from 'react';
import LeftMenu from './Sections/LeftMenu';
//import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon, Menu } from 'antd';
import './Sections/Navbar.css';
import logo from './../../../hex.png';

import { VpnKey, ExitToApp } from '@material-ui/icons/';

class NavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: false
    }
   
  }

  renderLoginButton() {
    //si está logueado
    if (this.props.isAuth) {
      return (
        <div >
            <p>
              {this.props.user.name} 
              <img
                src={this.props.user.photoURL}
                alt={this.props.user.displayName}
                width="30"
                style={{borderRadius:30}}
              />
            </p>
        </div>
      );
    }
    else {
      //si no lo está
      return (
        <div onClick={this.props.handleAuth}>
          <p>
          <VpnKey />
          </p>
          </div>
      );
    }
  }
  renderLogoutButton(){
    return(
      <div onClick={this.props.handleLogout}>
              <p ><ExitToApp/></p>
              </div>
    );
  }

  //const [visible, setVisible] = useState(false)

  showDrawer(){
    this.setState({visible:true});
  };

  onClose(){
    this.setState({visible:false});
  };
  render(){
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
      <a href="/">
      <img src={logo} className="menu-logo" alt="logo" />
      </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" 
          curUser={this.props.user}
          isAuth={this.props.isAuth}/>
        </div>
        <div className="menu_rigth">
        <Menu mode="horizontal">
          <Menu.Item key="Login">
            {this.renderLoginButton()}
            {/* Login */}
          </Menu.Item>
          { this.props.isAuth ? (
            <Menu.Item key="Logout">
              {this.renderLogoutButton()}
            </Menu.Item>
          ) : null}
        </Menu>
        </div>
        <Button
          className="menu__mobile-button"
          ghost
          type="text"
          onClick={() => this.showDrawer()}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="HEX Blog"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={() => this.onClose()}
          visible={this.state.visible}
        >
          <LeftMenu mode="inline" 
          isAuth={this.props.isAuth}
          curUser={this.props.user}/>
          
          <Menu mode="inline">
          <Menu.Item key="Login">
            {this.renderLoginButton()}
            {/* Login */}
          </Menu.Item>
          { this.props.isAuth ? (
            <Menu.Item key="Logout">
              {this.renderLogoutButton()}
            </Menu.Item>
          ) : null}
        </Menu>
        </Drawer>
      </div>
    </nav>
  );}
}

export default NavBar