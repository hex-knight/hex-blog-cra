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
      </div>
        )
    }
}
