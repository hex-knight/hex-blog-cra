import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import CreateBlog from '../../views/Blog/New/CreateBlog';
import Blog from '../../views/Blog/View/Blog';
import Home from '../../views/Home/Home';

import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class Base extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:null
        }
    }
    componentDidMount(){
        console.log(this.props);
        if(this.props.user){
            this.getUser();
        }
    }

    getUser(){
        this.setState({user:this.props.user})
    }
    

    render() {
        return (
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <div className="App">
        <header className="App-header">
            <Router>
            <div>
          <Route exact path="/"component={Home} user={this.state.user}/>
          <Route exact path="/blog/new" component={CreateBlog} />
          <Route path="/blogs" component={Blog} />
          
          </div>
          </Router>
        </header>
        </div>
        </div>
        )
    }
}
