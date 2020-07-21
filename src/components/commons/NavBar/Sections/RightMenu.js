/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Menu } from 'antd';
//import axios from 'axios';
//import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
//import { useSelector } from "react-redux";

class RightMenu extends Component {
  
  render(){
    return(
      <Menu mode={this.props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

