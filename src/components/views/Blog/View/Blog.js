import React, {  Component } from 'react';
import firebase from 'firebase';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './Blog.css';
import logo from '../../../../hex.png';

class Blog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: null,
        }
    }

    componentWillMount() {
        var starCountRef = firebase.database().ref('Blogs/');
        starCountRef.on('value', async snapshot => {
            console.log(snapshot.val());
            if(snapshot.val()==null){
                this.setState({cards:(
                    <h5>No existen blogs disponibles :(</h5>
                )})
            }else{
            let content = Object.values(snapshot.val()).reverse();
            console.log(content);
            const renderBlogs = content.map((blog, index) => {
                return <Col xl={8} md={25} xs={25}
                
                >
                    <Card
                        hoverable
                        style={{ width: 370, margin:15, 
                            alignSelf:'center'}}
                        bordered={false}
                        cover={blog.cover!==''?
                        (<img alt="Cover" src={blog.cover} />):
                        (<img src={logo} alt="Sin portada" className="no-cover"/>)}
                        className="card"
                        extra={index===0?"Nuevo!":null}
                    >
                        {blog.titulo !== '' ? (
                            <Meta
                                title={blog.titulo}
                                description={blog.fecha}
                            />
                        ) :
                            <Meta
                                title={'...'}
                                description={blog.fecha}
                            />
                        }
                    </Card>
                </Col>
            });
            this.setState({ cards: renderBlogs });
            console.log("Done: ", this.state.cards);
        }
        });
    }




    render() {
        return (
            <div className="Grid">
                <h6>
                    Blogs
                </h6>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {
                        this.state.cards
                    }
                </Row>
            </div>
        )
    }
}


export default Blog
