import React from 'react';
import { Menu } from 'antd';
//import BlogContext from '../../../../contex/context';
import './Navbar.css';

function LeftMenu(props) {
  const hasAccess = props.isAuth && (process.env.NODE_ENV==='development'||
    (process.env.NODE_ENV==='production' &&
    process.env.REACT_APP_CREATOR_ID===props.curUser.id));
  //const context = useContext(BlogContext);
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="Blog">
        <a href="/">Blogs</a>
      </Menu.Item>
      {
        hasAccess ? (
          <Menu.Item key="Create">
            <a href="/blog/new">Nuevo</a>
          </Menu.Item>
        ) : null
      }
      
    </Menu>
  )
}

export default LeftMenu