import React, { Component } from 'react';
import firebase from 'firebase';
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
            </div>
        )
    }
}

