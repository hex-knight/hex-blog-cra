import React, { Component } from 'react';
//import firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/database';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import "../../../../node_modules/react-quill/dist/quill.core.css";
import ScrollTop from './../../commons/BackToTop/BackToTop'
import CommentsInput from '../../commons/Comments/CommentsInput';
import { Divider, Typography, Collapse } from 'antd';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from 'react-share';
import { Helmet } from 'react-helmet';

const { Title } = Typography;
const { Panel } = Collapse;

export default class Blog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: null,
            fetching: false,
            content: null,
            cover: ''
        }
    }

    UNSAFE_componentWillMount() {
        console.log(this.props)
        document.title = this.props.match.params.title;
        this.setState({ fetching: true });
        const postId = this.props.match.params.postId;
        try{
        var starCountRef = firebase.database().ref('Blogs/' + postId);
        console.log(starCountRef)
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
                console.log(Post);
                this.setState({ result: Post, cover: Post.cover })
                setTimeout(
                    this.setState({ fetching: false }),
                    2000
                );
            }
        });}
        catch(error){
            console.log("ERROR: ",error)
            this.setState({
                result: (
                    <h5>Hubo un error obteniendo los datos :(</h5>
                )
            })
            this.setState({ fetching: false })
        }
    }




    render() {
        return (
            <div className="postPage" style={{ color: '#4b4b4b' }}>
                <Helmet>
                    <title>
                        {this.props.match.params.title} | Hex Blog
                    </title>
                    <link rel="canonical"
                        href="https://hex-blog.netlify.app/"
                    />
                    <meta name="og:title"
                        property="og:title"
                        content={this.props.match.params.title}
                    />
                    <meta name="og:description"
                        property="og:description"
                        content="No te va a gustar"
                    />
                    <meta name="og:image"
                        property="og:image"
                        content={this.state.cover}
                    />
                    <meta name="og:url"
                        property="og:url"
                        content={document.location}
                    />
                </Helmet>
                <div id="top"></div>
                {this.state.fetching ?
                    (<h6>Cargando...</h6>) :
                    (
                        <div className="postBody">
                            <div className="post-title"
                            style={{
                                backgroundImage:`url(${this.state.result.cover})`
                            }}
                            >
                            <Title level={2}
                            >
                                {this.state.result.titulo !== '' ?
                                    this.state.result.titulo :
                                    this.state.result.fecha
                                }
                            </Title>
                            </div>
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
                            <div className="comments">
                                <Divider />
                                <Collapse className="collapsable"
                                    bordered={false}>
                                    <Panel header="Comentarios" key="1">
                                        <CommentsInput
                                            postId={this.props.match.params.postId}
                                            user={this.props.user}
                                            isAuth={this.props.isAuth}
                                            handleAuth={this.props.handleAuth}
                                        />
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="shareArea">
                                <FacebookShareButton className="shareButtons"
                                    url={window.location.href}
                                    title={this.props.match.params.title}
                                >
                                 <FacebookIcon size={32} round={true}/>
                                </FacebookShareButton>
                                <TwitterShareButton className="shareButtons"
                                    url={window.location.href}
                                    title={this.props.match.params.title}
                                >
                                  <TwitterIcon size={32} round={true}/>
                                </TwitterShareButton>
                            </div>
                        </div>

                    )
                }
                <ScrollTop opType='1'>
                    <Fab className="colorInherit"
                        color="inherit" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
                <ScrollTop opType='2'>
                    <Fab className="colorInherit"
                        color="inherit" size="small" aria-label="scroll back to top">
                        <KeyboardArrowLeftIcon />
                    </Fab>
                </ScrollTop>
            </div>
        )
    }
}

