import React, { Component } from 'react';
import LeftMenu from './Sections/LeftMenu';
//import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon, Menu } from 'antd';
import './Sections/Navbar.css';
import logo from './../../../hex.png';
import Base from '../Base/Base';
import firebase from 'firebase';
import { VpnKey, ExitToApp } from '@material-ui/icons/';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      user: null,
      isLoggedIn: false,
      visible: false
    }
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const name = user.displayName;
        const index = name.toString().indexOf(' ');
        const firstName = name.toString().substring(0,index);
        this.setState({name: firstName});
      }
      this.setState({ user });
    })
  }

  handleAuth() {
    //crear un proveedor de Google para Login
    const provider = new firebase.auth.GoogleAuthProvider();
    //llamar a la API de Auth de firebase
    firebase.auth().signInWithPopup(provider)//generamos el popUp de Login
      .then(result => {
        console.log(`${result.user.email} ha iniciado sesion`)
      })//si es correcto, manipulamos el result
      .catch(error => {
        console.log(`${error.code}:${error.message}`)
      })//si no es correcto, cachamos errores
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => {
        console.log(`${this.state.user.email} ha salido`)
      })//si es correcto, manipulamos el result
      .catch(error => {
        console.log(`${error.code}:${error.message}`)
      })//si no es correcto, cachamos errores
  }

  renderLoginButton() {
    //si está logueado
    if (this.state.user) {
      return (
        <div >
            <p>
              {this.state.name} 
              <img
                src={this.state.user.photoURL}
                alt={this.state.user.displayName}
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
        <div onClick={this.handleAuth}>
          <p>
          <VpnKey />
          </p>
          </div>
      );
    }
  }
  renderLogoutButton(){
    return(
      <div onClick={this.handleLogout}>
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
    <>
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
      <a href="/">
      <img src={logo} className="menu-logo" alt="logo" />
      </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
        <Menu mode="horizontal">
          <Menu.Item key="Login">
            {this.renderLoginButton()}
            {/* Login */}
          </Menu.Item>
          { this.state.user ? (
            <Menu.Item key="Logout">
              {this.renderLogoutButton()}
            </Menu.Item>
          ) : null}
        </Menu>
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
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
          <LeftMenu mode="inline" />
          <Menu mode="inline">
          <Menu.Item key="Login">
            {this.renderLoginButton()}
            {/* Login */}
          </Menu.Item>
          { this.state.user ? (
            <Menu.Item key="Logout">
              {this.renderLogoutButton()}
            </Menu.Item>
          ) : null}
        </Menu>
        </Drawer>
      </div>
    </nav>
    <Base user={this.state.name} />
    </>
  );}
}

export default NavBar