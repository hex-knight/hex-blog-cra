import React, { Component, PureComponent } from 'react'
import { Col, Card, Row, Pagination } from 'antd';
import Meta from 'antd/lib/card/Meta';
import '../../views/Blog/View/Blog.css';
import logo from '../../../../src/hex.png';

export default class GridList extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
             content: this.props.dataSet,
             ids: this.props.ids,
             page: this.props.page,
             pageSize: this.props.pageSize,
             grid: []
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.dataSet!==prevProps.content ||
            this.props.page!==prevProps.page){
              this.setState({
                  content:this.props.dataSet,
                  ids: this.props.ids,
                  page: this.props.page,
              })
            }
    }


    

    render(){
        return this.state.content.map((blog, index) => {
            return <Col xs={24} md={12} lg={12} xl={8}
            className="col">
                <Card
                    className="card"
                    hoverable
                    bordered={false}
                    cover=
                    {blog.cover !== '' ?
                        (<img alt="Cover" src={blog.cover}
                        onClick={() => window.location=`/blogs/${blog.titulo}/${this.state.ids[index]}`}
                        />) :
                        (<img src={logo} alt="Sin portada" className="no-cover"
                        onClick={() => window.location=`/blogs/${blog.titulo}`} 
                        style={{
                            borderRadius:'150%',
                            minWidth:340,
                            maxWidth:340,
                            height:340}}/>)}
                >
                    <a href={`/blogs/${blog.titulo}/${this.state.ids[index]}`}>
                    {blog.titulo !== '' ? (
                        <Meta
                            
                            title={blog.titulo}
                            description={index===0?"Nuevo!":blog.fecha}
                            
                        />
                    ) :
                        <Meta
                            title={'...'}
                            description={index===0?"Nuevo!":blog.fecha}
                        />
                    }
                    </a>
                </Card>
            </Col>
        }).slice(
            (this.state.page-1)*this.state.pageSize,
            this.state.page*this.state.pageSize
            );
        }       
}
