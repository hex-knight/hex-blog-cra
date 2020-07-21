import React, { Component } from 'react';
import firebase from 'firebase';
import './Home.css';
import { Button, Typography, Grid, Divider } from '@material-ui/core/';
import { VpnKey, ExitToApp } from '@material-ui/icons/';
const styles = require('../../../consts/styles');

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
          user: null,
          isLoggedIn: false,
        }
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
      }
    
      componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
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
    
      handleLogout(){
        firebase.auth().signOut()
        .then(result => {
          console.log(`${result.user.email} ha salido`)
        })//si es correcto, manipulamos el result
        .catch(error => {
          console.log(`${error.code}:${error.message}`)
        })//si no es correcto, cachamos errores
      }
    
      renderLoginButton() {
        //si está logueado
        if (this.state.user) {
          return (
            <div>
              <Grid container alignItems="center" style={styles.grid}>
                <img 
                  src={this.state.user.photoURL}
                  alt={this.state.user.displayName}
                  width="100"
                />
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ backgroundColor: 'gray', marginLeft: 20}}
                  //variant="inset"
                />
                <Typography
                  variant="h4" gutterBottom
                  style={styles.item}
                >
                  {this.state.user.displayName}
                </Typography>
              </Grid>
              <Button onClick={this.handleLogout}
                style={styles.button}
                variant="contained"
                startIcon={<ExitToApp />}>
                Salir
            </Button>
            </div>
          );
        }
        else {
          //si no lo está
          return (
            <Button onClick={this.handleAuth}
              style={styles.button}
              variant="contained"
              startIcon={<VpnKey />}>
              Login with Google
            </Button>
          )
        }
      }
    render() {
        return (
            <div>
          <Typography variant="subtitle1" gutterBottom>
            [ HEX ]
             Blog
          </Typography>
          <div>
            {this.renderLoginButton()}
          </div>
          <p onClick={() => window.location="/blog/new"}>
            Create new Blog
          </p>
      </div>
        )
    }
}
