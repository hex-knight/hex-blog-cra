import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="Home" className="ant-menu-item">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="Blog">
      <a href="/blog">Blog</a>
    </Menu.Item>
    <Menu.Item key="Create">
      <a href="/blog/new">Nuevo</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu