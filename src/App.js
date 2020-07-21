import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/views/Home/Home';
import CreateBlog from './components/views/Blog/New/CreateBlog';
import NavBar from './components/commons/NavBar/NavBar';
import './App.css';
import Blog from './components/views/Blog/View/Blog';

class App extends Component {
  render() {
    return (
      <Suspense>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <div className="App">
        <header className="App-header">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blog/new" component={CreateBlog} />
          <Route exact path="/blog" component={Blog} />
        </Switch>
        </header>
        </div>
        </div>
      </Suspense>
    );
  }
}

export default App;
