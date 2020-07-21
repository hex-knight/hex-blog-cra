import React, { Component } from 'react';
import { Menu } from 'antd';
import firebase from 'firebase';
import './Navbar.css';
import { VpnKey, ExitToApp } from '@material-ui/icons/';

class RightMenu extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      user: null,
      isLoggedIn: false,
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
        <div className="ant-menu-item">
            <a >
              {this.state.name} 
              <img
                src={this.state.user.photoURL}
                alt={this.state.user.displayName}
                width="30"
                style={{borderRadius:30}}
              />
            </a>
        </div>
      );
    }
    else {
      //si no lo está
      return (
        <a onClick={this.handleAuth}><VpnKey /></a>
      );
    }
  }

  render() {
    return (
      <Menu mode={this.props.mode}>
          <Menu.Item key="Login">
            {this.renderLoginButton()}
          </Menu.Item>
          { this.state.user ? (
            <Menu.Item key="Logout">
              <a className="ant-menu-item" onClick={this.handleLogout}><ExitToApp /></a>
            </Menu.Item>
          ) : null}
        </Menu>
    );
  }
}

export default RightMenu;

