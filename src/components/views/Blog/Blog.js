import React, { Component } from 'react';
import firebase from 'firebase';
//import Title from 'antd/lib/skeleton/Title';
import "../../../../node_modules/react-quill/dist/quill.core.css";

export default class Blog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: null,
            fetching: false,
            content: null

        }
    }

    componentWillMount() {
        this.setState({ fetching: true });
        const postId = this.props.match.params.postId;
        var starCountRef = firebase.database().ref('Blogs/' + postId);
        starCountRef.on('value', snapshot => {
            if (snapshot.val() == null) {
                console.log("ERROR");
                this.setState({
                    result: (
                        <h5>Hubo un error obteniendo los datos :(</h5>
                    )
                })
                this.setState({ fetching: false })
            } else {
                let Post = snapshot.val()
                //console.log(Post);
                //const renderBlog = 
                this.setState({ result: Post })
                setTimeout(
                    this.setState({ fetching: false }),
                    2000
                );
            }
        });
    }




    render() {
        return (
            // <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <div className="postPage" style={{color:'#4b4b4b'}}>
                {/* <Col xs={25} md={24} lg={12} xl={8}> */}
                {this.state.fetching ?
                    (<h6>Cargando...</h6>) :
                    (
                        <div>

                            <h4>
                                {this.state.result.titulo !== '' ?
                                    this.state.result.titulo :
                                    this.state.result.fecha
                                }
                            </h4>
                            <br />
                            {
                                this.state.result.titulo !== '' ?
                                    (
                                        <div className="date">
                                            <h6>{this.state.result.fecha}</h6>
                                        </div>
                                    ) : null
                            }
                            <div 
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: this.state.result.contenido }} />
                        </div>
                    )
                }
                {/* </Col> */}
            </div>
            // </Row>
        )
    }
}


// <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
                    //     <Title level={2}>
                    //         {Post.titulo!==''? 
                    //         Post.titulo :
                    //         Post.fecha
                    //         }
                    //         </Title>
                    //     <br />
                    //     {
                    //         Post.titulo!==''?
                    //         (
                    //             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    //         <Title level={4}>{Post.fecha}</Title>
                    //     </div>
                    //         ):null
                    //     }
                    //     <div dangerouslySetInnerHTML={{ __html: Post.contenido }} />
                    // </div>