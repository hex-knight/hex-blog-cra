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
      curUser: null,
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
        this.setState({ curUser: {
          id: user.uid,
          name:firstName,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        }});
        this.setState({isLoggedIn:true});
      }
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
        this.setState({isLoggedIn:false});
        this.setState({curUser: null});
        console.log(window.location);
        if(window.location.pathname==="/blog/new")
        {
          setTimeout(
            () => window.location="/",
            2000
          );
        }
        console.log(`${this.state.curUser.email} ha salido`);
      })//si es correcto, manipulamos el result
      .catch(error => {
        console.log(`${error.code}:${error.message}`)
      })//si no es correcto, cachamos errores
  }

  renderLoginButton() {
    //si está logueado
    if (this.state.isLoggedIn) {
      return (
        <div >
            <p>
              {this.state.curUser.name} 
              <img
                src={this.state.curUser.photoURL}
                alt={this.state.curUser.displayName}
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
          <LeftMenu mode="horizontal" 
          isAuth={this.state.isLoggedIn}/>
        </div>
        <div className="menu_rigth">
        <Menu mode="horizontal">
          <Menu.Item key="Login">
            {this.renderLoginButton()}
            {/* Login */}
          </Menu.Item>
          { this.state.isLoggedIn ? (
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
          <LeftMenu mode="inline" 
          isAuth={this.state.isLoggedIn}
          curUser={this.state.curUser}/>
          
          <Menu mode="inline">
          <Menu.Item key="Login">
            {this.renderLoginButton()}
            {/* Login */}
          </Menu.Item>
          { this.state.isLoggedIn ? (
            <Menu.Item key="Logout">
              {this.renderLogoutButton()}
            </Menu.Item>
          ) : null}
        </Menu>
        </Drawer>
      </div>
    </nav>
    <Base curUser={this.state.curUser} isAuth={this.state.isLoggedIn} />
    </>
  );}
}

export default NavBar