import React, { Component } from 'react'
import {  Avatar } from '@material-ui/core';
import firebase from 'firebase';
import { message, Comment, Form, Tooltip, Button, Checkbox } from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

moment.locale(['es', 'MX']);

export default class CommentsInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            comments: [],
            sending: false,
            buttonDisabled: true,
            anonimal: false
        }
    }



    componentWillMount() {
        var ref = firebase.database().ref("Comments/");
        ref.orderByChild("postId").equalTo(this.props.postId).on("value", async snapshot => {
            if (snapshot.val() == null) {
                this.setState({
                    comments: (
                        <h5>No existen comentarios :(</h5>
                    )
                })
            } else {
                let content = Object.values(snapshot.val()).reverse();
                console.log("Result: ", content);
                const renderComments = content.map((comm, index) => {
                    return (
                    <React.Fragment>
                    <Comment
                        className="comment-content"
                        author={<p>{comm.nombre}</p>}
                        avatar={
                            <Avatar
                                src={comm.foto}
                                alt={comm.nombre}
                            />
                        }
                        content={
                            <p className="comments">
                                {comm.comentario}
                            </p>
                        }
                        datetime={
                            <Tooltip title={moment(comm.fecha).format('YYYY-MM-DD HH:mm:ss')}>
                                <span>{moment(comm.fecha).fromNow()}</span>
                            </Tooltip>
                        }
                    />
                    </React.Fragment>
                    )
                });
                this.setState({ comments: renderComments });
            }
        });
    }

    changeComment = event => {
        this.setState({ comment: event.target.value });
    }

    changeAnonimal = event =>{
        this.setState({ anonimal: event.target.checked });
    }

    sendComment = () => {
        this.setState({sending:true});
        const an=this.state.anonimal;
        //console.log(comment);
        const key = 'updatable';
        const dbRef = firebase.database().ref('Comments/');
        const newEntry = dbRef.push();
        const variables = {
            postId: this.props.postId,
            foto: an?'':this.props.user.photoURL,
            nombre: an?'Anónimo':(`${this.props.user.name}`),
            comentario: this.state.comment,
            fecha: Date.now(),
        }
        console.log("Entry :", variables);
        setTimeout( () => {
            newEntry.set(variables,
                function (error) {
                    if (error) {
                        message.error({ content: 'Error!', key, duration: 2 });
                    } else {
                        console.log("success");
                        message.success({ content: 'Enviado!', key, duration: 2 });
    
                    }
                }).then(
                    this.setState({sending:false})
    
                );
                this.setState({comment:''});
        }, 1500)
    }
    render() {
        return (
            <div>
                <div className="comments-section">
                {this.state.comments ? this.state.comments : null}
                </div>
                {this.props.isAuth ? (
                    <div>
                        <Comment
                        author={<p>{this.props.user.name}</p>}
                        avatar={
                            <Avatar
                              src={this.props.user.photoURL}
                             alt={this.props.user.displayName}
                             />
                           }
                     content={
                         <>
                        <Form.Item>
                            <TextArea className="comment-area"
                            allowClear bordered={false}
                            autosize
                            rows={2} onChange={this.changeComment} 
                            value={this.state.comment} />
                            <Checkbox onChange={this.changeAnonimal}
                            >Comentario Anónimo</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={this.state.comment===''?true:false}
                            htmlType="submit" loading={this.state.sending} onClick={this.sendComment} 
                                type="primary">
                                Enviar
                            </Button>
                        </Form.Item>
                        </>
                     }
                     />
                    </div>
                ) : (
                        <p>
                            Para comentar debes iniciar sesión
                        </p>
                    )
                }

            </div>
        )
    }
}
