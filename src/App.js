import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import CreateBlog from './components/views/Blog/New/CreateBlog';
import NavBar from './components/commons/NavBar/NavBar';
import './App.css';
import Blog from './components/views/Blog/View/Blog';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Home} />
          <Route path="/blog/new" component={CreateBlog} />
          <Route path="/blog" component={Blog} />
        </header>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
