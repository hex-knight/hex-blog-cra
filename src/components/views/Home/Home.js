import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user:null
    }
  }
  componentDidMount(){
    if(this.props.user){
      this.getUser();
    }
  }

  getUser(){
    this.setState({user:this.props.user})
  }

  

    render() {
        return (
            <div>
              <h4>
                Home Page
              </h4>
              <h5>
                Bienvenido {
                  this.props.curUser ? 
                  this.props.curUser.displayName : null
                }
              </h5>
              <h6>
                Por hacer:
                <li>
                  Loading cards cuando entra al index: timeout de 2000ms
                </li>
                <li>
                  Página de blog por id
                </li>
                <li>
                  Galeria: revisar (y eliminar) fotografías almacenadas
                </li>
                <li>
                  Habilitar opciones de borrar posts
                </li>
                <li>
                  Ideas para la homepage???Convertir index en homepage?
                </li>
                <li>
                  Research buscador
                </li>
                <li>
                  Hacer banco de Tags
                </li>
                <li>
                  Research comentarios ? reacciones ? sin interacción
                </li>
              </h6>
      </div>
        )
    }
}
