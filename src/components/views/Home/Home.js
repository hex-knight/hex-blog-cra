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
              <div className="postBody"
              style={{textAlign:'left'}}>
              <h3>
                Home Page
              </h3>
              <h2>
                Bienvenido {
                  this.props.user ? 
                  this.props.user.displayName : null
                }
              </h2>
              
              <ul>
                <h2>
                  POC: filtrar por tag
                  <ol>
                  Hacer banco de Tags
                  </ol>
                </h2>
                <h2>
                  Research buscador
                </h2>
              </ul>
              </div>
      </div>
        )
    }
}
