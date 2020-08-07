import React, { Component } from 'react';
import firebase from 'firebase';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './Blog.css';
import logo from '../../../../hex.png';

class Blogs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: null,
        }
    }

    componentWillMount() {
        var starCountRef = firebase.database().ref('Blogs/');
        starCountRef.on('value', async snapshot => {
            //console.log(Object.getOwnPropertyNames(snapshot.val()));
            if (snapshot.val() == null) {
                this.setState({
                    cards: (
                        <h5>No existen blogs disponibles :(</h5>
                    )
                })
            } else {
                const ids=Object.getOwnPropertyNames(snapshot.val()).reverse();
                let content = Object.values(snapshot.val()).reverse();
                
                const renderBlogs = content.map((blog, index) => {
                    return <Col xs={24} md={12} lg={12} xl={8}
                    className="col">
                        <Card
                            className="card"
                            hoverable
                            bordered={false}
                            cover=
                            {blog.cover !== '' ?
                                (<img alt="Cover" src={blog.cover}
                                onClick={() => window.location=`/blogs/${blog.titulo}/${ids[index]}`}
                                />) :
                                (<img src={logo} alt="Sin portada" className="no-cover"
                                onClick={() => window.location=`/blogs/${blog.titulo}`} 
                                style={{
                                    borderRadius:'150%',
                                    minWidth:350,
                                    maxWidth:350,
                                    height:350}}/>)}
                        >
                            <a href={`/blogs/${blog.titulo}/${ids[index]}`}>
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
                });
                this.setState({ cards: renderBlogs });
                
            }
        });
    }




    render() {
        return (
            <div className="cards">
                <Row gutter={{ xs: 8, sm: 12, md: 12, lg: 24 }}>
                    {
                        this.state.cards
                    }
                </Row>
            </div>
        )
    }
}


export default Blogs
