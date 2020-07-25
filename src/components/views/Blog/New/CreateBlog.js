import React, { useState } from 'react'
import { Typography, Button, Form/*, message*/ } from 'antd';
import QuillEditor from '../../../editor/QuillEditor';
//import axios from 'axios';
import { Input } from '@material-ui/core';
const { Title } = Typography;

export default function CreateBlog(props) {
    const [content, setContent] = useState("");
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState("");
    // const apiUrl= process.env.NODE_ENV === 'production' ?
    //         "https://hex-blog-backend.herokuapp.com/":
    //         "http://localhost:5000/";

    const onEditorChange = (value) => {
        setContent(value);
    }

    const onFilesChange = (files) => {
        console.log("Files: ",files);
        setPhotos(files);
    }
    
    const onSubmit = (event) =>{
        event.preventDefault();
        setContent("");
        const variables ={
            content: content,
            files:photos,
            userId: props.curUser.id,
            blogTitle: title,
        }
        console.log("Values ",variables);


        // axios.post(apiUrl+'api/blog/createPost', variables)
        //     .then(response => {
        //         console.log(response);
        //         if (response) {
        //             message.success('Post Created!');

        //             setTimeout(() => {
        //                 window.location="/";
        //             }, 2000);
        //         }
        //     })
    }
    const handleTitle = ({target : {value}}) =>{
        setTitle(value);
    }




    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} >Nueva Entrada</Title>
            </div>
            <div>
                <Input placeholder={
                    "Título (opcional)"
                } 
                allowClear={"true"}
                value={title}
                style={{width:'100%',marginBottom:20}}
                onChange={handleTitle}
                />
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={onSubmit}
                        
                    >
                        Submit
                </Button>
                </div>
            </Form>
        </div>
    )
}
