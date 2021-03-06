import React, { Component } from 'react';
import NavBar from './components/commons/NavBar/NavBar';
import './App.css';
// import firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import Footer from './components/commons/Footer/Footer';
import { Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import CreateBlog from './components/views/Blog/New/CreateBlog';
import Blogs from './components/views/Blog/View/Blogs';
import Blog from './components/views/Blog/Blog';
import { Helmet } from 'react-helmet';
import BlogContext from './contex/context';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user: null,
       isAuth: null,
       displayMode: 'grid',
       dataSet: []
    }
    //bind handleAuth
    //bind handleLogout
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeDisplayMode = this.changeDisplayMode.bind(this);
    this.changeDataSet = this.changeDataSet.bind(this);
  }

  changeDataSet = data =>{
    this.setState({dataSet:data});
  }

  static contextType = BlogContext;

  UNSAFE_componentWillMount(){
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
    var starCountRef = firebase.database().ref('Blogs/');
        starCountRef.on('value', async snapshot => {
            //console.log(Object.getOwnPropertyNames(snapshot.val()));
            if (snapshot.val() == null) {
                this.setState({
                    cards: (
                        [<h5>No existen blogs disponibles :(</h5>]
                    )
                })
            } else {

                const ids = Object.getOwnPropertyNames(snapshot.val()).reverse();
                let values = Object.values(snapshot.val()).reverse();
                let content = values.map((entry, index)=>{
                    // entry = {...entry}
                    // entry.postId=ids[index];
                    return entry={
                        ...entry,
                        idBlog: ids[index]
                    }
                })
                //this.context.changeDataSet(content);
                this.changeDataSet(content)
            }
        });
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
        console.log(`${this.state.curUser.email} ha salido`);
        this.setState({isAuth:false, curUser:null});
        //this.setState({curUser: null});
        console.log(window.location);
        if(window.location.pathname==="/blog/new")
        {
          setTimeout(
            () => window.location="/",
            2000
          );
        }
      })
      .catch(error => {
        this.setState({isAuth:false, curUser:null})
        console.log(`${error.code}:${error.message}`)
      })
  }

  changeDisplayMode(){
    this.setState({
      displayMode: (this.state.displayMode==='grid'?'list':'grid')
    });
  }
  

  render() {
    return (
      <BlogContext.Provider
        value={{
          //variables:
          user: this.state.user,
          isAuth: this.state.isAuth,
          displayMode: this.state.displayMode,
          dataSet: this.state.dataSet,
          //funciones:
          changeDataSet: this.changeDataSet,
          handleAuth: this.handleAuth,
          handleLogout: this.handleLogout,
          changeDisplayMode: this.changeDisplayMode
        }}
      >
        <Helmet>
          <title>HEX Blog</title>
        </Helmet>
        
        <div className="App">
        <NavBar 
          // handleAuth={this.handleAuth} 
          // handleLogout={this.handleLogout}
          user={this.state.user}
          isAuth={this.state.isAuth}
        />
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
              isAuth={this.state.isAuth}
              handleAuth={this.handleAuth}
              /> }
            />
          </div>
        <Footer className="footer"/>
      </BlogContext.Provider>
    );
  }
}

export default App;
