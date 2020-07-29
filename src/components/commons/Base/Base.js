import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import CreateBlog from '../../views/Blog/New/CreateBlog';
import Blog from '../../views/Blog/View/Blog';
import Home from '../../views/Home/Home';

import {BrowserRouter as Router, Route} from 'react-router-dom';
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
              process.env.NODE_ENV==='production'?
              (process.env.CREATOR_ID===this.props.curUser.id?
              (
                    <CreateBlog curUser={this.props.curUser} 
                    isAuth={this.props.isAuth}/>
              ): null):
              (<CreateBlog curUser={this.props.curUser} 
                    isAuth={this.props.isAuth}/>)
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
