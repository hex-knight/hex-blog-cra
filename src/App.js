import React, { Component } from 'react';
import NavBar from './components/commons/NavBar/NavBar';
import './App.css';
import firebase from 'firebase';
import Footer from './components/commons/Footer/Footer';
import { Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import CreateBlog from './components/views/Blog/New/CreateBlog';
import Blogs from './components/views/Blog/View/Blogs';
import Blog from './components/views/Blog/Blog';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user: null,
       isAuth: null,
    }
    //bind handleAuth
    //bind handleLogout
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount(){
    //document.title="HEX Blog";
    //auth de firebase
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const name = user.displayName;
        const index = name.toString().indexOf(' ');
        const firstName = name.toString().substring(0,index);
        this.setState({ user: {
          id: user.uid,
          name:firstName,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        }});
        this.setState({isAuth:true});
      }else{
        this.setState({user:null});
      }
    })
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)//generamos el popUp de Login
      .then(result => {
        console.log(`${result.user.email} ha iniciado sesion`)
      })
      .catch(error => {
        console.log(`${error.code}:${error.message}`)
      })
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => {
        this.setState({isAuth:false});
        this.setState({curUser: null});
        console.log(window.location);
        if(window.location.pathname==="/blog/new")
        {
          setTimeout(
            () => window.location="/",
            2000
          );
        }
        console.log(`${this.state.curUser.email} ha salido`);
      })
      .catch(error => {
        console.log(`${error.code}:${error.message}`)
      })
  }


  

  render() {
    return (
      <React.Fragment>
        <NavBar 
          handleAuth={this.handleAuth} 
          handleLogout={this.handleLogout}
          user={this.state.user}
          isAuth={this.state.isAuth}
        />
        <div className="App">
            <Route exact path="/todo">
              <Home user={this.state.user} />
            </Route>
            <Route exact path="/blog/new">
              <CreateBlog user={this.state.user} isAuth={this.state.isAuth} />
            </Route>
            <Route exact path="/">
              <Blogs user={this.state.user} />
            </Route>
            <Route exact path="/blogs/:title/:postId"
              render={(props)=> <Blog {...props} user={this.state.user} 
              isAuth={this.state.isAuth}/> }
            /> 
          </div>
        <Footer className="footer"/>
      </React.Fragment>
    );
  }
}

export default App;
