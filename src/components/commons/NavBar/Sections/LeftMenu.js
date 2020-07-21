import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="Home" className="ant-menu-item">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="Blog">
    <p className={"ant-menu-item a"} onClick={window.location="/blog"}>Home</p>
    </Menu.Item>
    <Menu.Item key="Create">
      <a href="/blog/new">Nuevo</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu