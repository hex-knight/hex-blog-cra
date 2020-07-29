import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import CreateBlog from '../../views/Blog/New/CreateBlog';
import Blog from '../../views/Blog/View/Blog';
import Home from '../../views/Home/Home';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Button } from 'antd';
//import { Button } from 'antd';

export default class Base extends Component {

    render() {
        return (
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <div className="App">
        <header className="App-header">
            <Router>
            <div>
          <Route exact path="/">
              <Home curUser={this.props.curUser} />
          </Route>
          <Route exact path="/blog/new">
          {
              this.props.isAuth ? (
                    <CreateBlog curUser={this.props.curUser} 
                    isAuth={this.props.isAuth}/>
              ): (<div>
                <h4>
                    Acceso denegado
                </h4>
                <Button onClick={
                    () => window.location = "/"
                }>
                    Volver al inicio
                </Button>
            </div>)
          }
           </Route>
          <Route path="/blogs">
              <Blog curUser={this.props.curUser} />
          </Route>
          
          </div>
          </Router>
        </header>
        </div>
        </div>
        )
    }
}
