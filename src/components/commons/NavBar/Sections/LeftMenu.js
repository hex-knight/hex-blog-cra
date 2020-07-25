import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="Home" className="ant-menu-item">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="Blog">
        <a href="/blogs">Blogs</a>
      </Menu.Item>
      {
        props.isAuth ? (
          <Menu.Item key="Create">
            <a href="/blog/new">Nuevo</a>
          </Menu.Item>
        ) : null
      }
    </Menu>
  )
}

export default LeftMenu