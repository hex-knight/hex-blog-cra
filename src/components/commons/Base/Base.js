import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateBlog from '../../views/Blog/New/CreateBlog';
import Blog from '../../views/Blog/View/Blog';
import Home from '../../views/Home/Home';

export default class Base extends Component {
    render() {
        return (
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Home} />
          <Route path="/blog/new" component={CreateBlog} />
          <Route path="/blog" component={Blog} />
        </header>
        </div>
        </div>
        )
    }
}
