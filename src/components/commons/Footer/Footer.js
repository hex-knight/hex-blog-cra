import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div 
        className="footer"
        style={{
         display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', fontSize:'1rem',
        }}>
           <p> [ H E X ] Blog</p>
        </div>
    )
}

export default Footer