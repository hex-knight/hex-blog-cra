import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import CreateBlog from '../../views/Blog/New/CreateBlog';
import Blogs from '../../views/Blog/View/Blogs';
import Home from '../../views/Home/Home';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'antd';
import Blog from '../../views/Blog/Blog';
//import { Button } from 'antd';

export default class Base extends Component {
    hasAccess = this.props.isAuth && (process.env.NODE_ENV === 'development' ||
        (process.env.NODE_ENV === 'production' &&
            process.env.REACT_APP_CREATOR_ID === this.props.user.id));

    render() {
        return (
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                <div className="App">
                    <header >
                        <Router>
                            <div>
                                <Route exact path="/">
                                    <Home user={this.props.user} />
                                </Route>
                                <Route exact path="/blog/new">
                                    {
                                        this.props.isAuth ? (
                                            <CreateBlog user={this.props.user}
                                                isAuth={this.props.isAuth} />
                                        ) : (<div>
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
                                <Route exact path="/blogs">
                                    <Blogs user={this.props.user} />
                                </Route>
                                <Route exact path="/blogs/:title/:postId"
                                    render={(props) => <Blog {...props}
                                        user={this.props.user} />} />
                            </div>
                        </Router>
                    </header>
                </div>
            </div>
        )
    }
}
