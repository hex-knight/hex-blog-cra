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
            <div className="postPage">
              <div className="postBody">
              <h3>
                Home Page
              </h3>
              <h5>
                Bienvenido {
                  this.props.user ? 
                  this.props.user.displayName : null
                }
              </h5>
              
              <h6>
                Por hacer:
                <li>
                  Botón de "Regresar" para cada Blog (en el component)
                </li>
                <li>
                  Mostrar Tags en cada Blog
                </li>
                <li>
                  POC: filtrar por tag
                </li>
                <li>
                  POC: poder alternar entre GRID y LIST para el Index
                </li>
                <li>
                  Reducir tamaño para pantallas tipo landscape y mantener para portrait
                </li>
                <li>
                  Loading cards cuando entra al index: timeout de 2000ms
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
      </div>
        )
    }
}
