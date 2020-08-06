import React, { Component } from 'react';
import firebase from 'firebase';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import "../../../../node_modules/react-quill/dist/quill.core.css";
import ScrollTop from './../../commons/BackToTop/BackToTop'
import CommentsInput from '../../commons/Comments/CommentsInput';
import { Divider, Typography } from 'antd';
const {Title} = Typography;

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
        document.title=this.props.match.params.title;
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
            <div className="postPage" style={{color:'#4b4b4b'}}>
                <div id="top"></div>
                {this.state.fetching ?
                    (<h6>Cargando...</h6>) :
                    (
                        <div className="postBody">

                            <Title level={2}>
                                {this.state.result.titulo !== '' ?
                                    this.state.result.titulo :
                                    this.state.result.fecha
                                }
                            </Title>
                            {
                                this.state.result.titulo !== '' ?
                                    (
                                        <div className="date">
                                            <h4 >{this.state.result.fecha}</h4>
                                        </div>
                                    ) : null
                            }
                            <Divider />
                            <div 
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: this.state.result.contenido }} />
                        </div>
                    )
                }
                <div className="comments">
                    <Divider />
                    <Title level={4}>Comentarios</Title>
                <CommentsInput 
                postId={this.props.match.params.postId}
                user={this.props.user}
                isAuth={this.props.isAuth}
                />
                <Divider />
                </div>
                <ScrollTop>
                <Fab className="colorInherit"
                color="inherit" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            </div>
        )
    }
}

