import React, { PureComponent } from 'react'
import { List, Col, Card, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
import '../../views/Blog/View/Blog.css';
import logo from '../../../../src/hex.png';
import BlogContext from '../../../contex/context';
import { DeleteOutlined } from '@ant-design/icons';
import * as firebase from 'firebase/app';
import 'firebase/database';

export default class BlogList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            content: this.props.dataSet,
            ids: this.props.ids,
            page: this.props.page,
            pageSize: this.props.pageSize,
            grid: [],
            
        }
    }

    static contextType = BlogContext

    componentDidUpdate(prevProps) {
        if (this.props.dataSet !== prevProps.content ||
            this.props.page !== prevProps.page) {
            this.setState({
                content: this.props.dataSet,
                // ids: this.props.ids,
                page: this.props.page,
            })
        }
    }



    render() {
        return this.props.displayMode === 'grid' ? (
            this.state.content.map((blog, index) => {
                return <Col xs={24} md={12} lg={12} xl={8}
                    className="col">
                    <Card
                        className="card"
                        hoverable
                        bordered={false}
                        cover=
                        {blog.cover !== '' ?
                            (<img alt="Cover" src={blog.cover}
                            onClick={() => window.location = `/blogs/${blog.titulo}/${blog.idBlog}`}
                            />) :
                            (<a href={`/blogs/${blog.titulo}/${blog.idBlog}`}>
                            <img src={logo} alt="Sin portada" className="no-cover"
                            onClick={() => window.location = `/blogs/${blog.titulo}/${blog.idBlog}`}   
                            style={{
                                    borderRadius: '150%',
                                    minWidth: 'inherit',
                                    maxWidth: 340,
                                    height: 340
                                }} />
                                </a>
                                )}
                                actions={
                                    this.context.user?(
                                        this.context.user.id === blog.userId?
                                                                    (
                                                                        [<DeleteOutlined 
                                                                            onClick={() => {
                                                                                const key = "deleting"
                                                                        message.loading({content:"Borrando",key});
                                                                        setTimeout(() =>{
                                                                            firebase.database().ref('Blogs/'+blog.idBlog).remove();
                                                                            message.success({content:"Borrado",key});
                                                                        },
                                                                            400
                                                                        );
                                                                            }}
                                                                        />]
                                                                    ): null):null
                                }
                    >
                        <a href={`/blogs/${blog.titulo}/${blog.idBlog}`}>
                            {blog.titulo !== '' ? (
                                <Meta

                                    title={blog.titulo}
                                    description={index === 0 ? "Nuevo!" : blog.fecha}

                                />
                            ) :
                                <Meta
                                    title={'...'}
                                    description={index === 0 ? "Nuevo!" : blog.fecha}
                                />
                            }
                        </a>

                    </Card>
                </Col>
            }).slice(
                (this.state.page - 1) * this.state.pageSize,
                this.state.page * this.state.pageSize
            )
        ) : (
                <List
                    className="flat-list"
                    itemLayout="vertical"
                    size="default"
                >
                    {
                        this.state.content.map((blog, index) => {
                            return <List.Item
                                className="flat-list-item"
                                extra={
                                    blog.cover !== '' ? (
                                        <img alt="Cover" src={blog.cover}
                                            className="list-cover"
                                            onClick={() => window.location = `/blogs/${blog.titulo}/${blog.idBlog}`}
                                        // style={{
                                        //     borderRadius: '150%',
                                        //     minWidth: 100,
                                        //     maxWidth: 100,
                                        //     height: 100
                                        // }}
                                        />) :
                                        (
                                            <img src={logo} alt="Sin portada"
                                                className="list-cover"
                                                onClick={() => window.location = `/blogs/${blog.titulo}/${blog.idBlog}`}
                                            // style={{
                                            //     borderRadius: '150%',
                                            //     minWidth: 100,
                                            //     maxWidth: 100,
                                            //     height: 100
                                            // }} 
                                            />
                                        )
                                }
                                actions={
                                    this.context.user?(
                                        this.context.user.id === blog.userId?
                                                                    (
                                                                        [<DeleteOutlined 
                                                                            onClick={() => {
                                                                                const key = "deleting"
                                                                        message.loading({content:"Borrando",key});
                                                                        setTimeout(() =>{
                                                                            firebase.database().ref('Blogs/'+blog.idBlog).remove();
                                                                            message.success({content:"Borrado",key});
                                                                        },
                                                                            400
                                                                        );
                                                                            }}
                                                                        />]
                                                                    ): null):null
                                }
                            >
                                <List.Item.Meta
                                    title={<a href={
                                        `/blogs/${blog.titulo}/${blog.idBlog}`
                                    }>
                                        {blog.titulo}</a>}
                                />
                                {blog.fecha}
                            </List.Item>
                        }).slice(
                            (this.state.page - 1) * this.state.pageSize,
                            this.state.page * this.state.pageSize
                        )
                    }
                </List>
            )
    }
}
