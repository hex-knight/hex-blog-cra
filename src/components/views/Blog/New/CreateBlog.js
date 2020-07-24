import React, { useState } from 'react'
import { Typography, Button, Form, message} from 'antd';
import QuillEditor from '../../../editor/QuillEditor';
import axios from 'axios';
const { Title } = Typography;

export default function CreateBlog() {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const apiUrl= process.env.NODE_ENV === 'production' ?
            "https://hex-blog-backend.herokuapp.com/":
            "http://localhost:5000/";

    const onEditorChange = (value) => {
        setContent(value);
    }

    const onFilesChange = (files) => {
        setFiles(files);
    }
    
    const onSubmit = (event) =>{
        event.preventDefault();
        setContent("");

        const variables ={
            content: content,
            userID: "5f12094020766e2f64c80e36"
        }
        console.log("URL: ",apiUrl);


        axios.post(apiUrl+'api/blog/createPost', variables)
            .then(response => {
                console.log(response);
                if (response) {
                    message.success('Post Created!');

                    setTimeout(() => {
                        window.location="/";
                    }, 2000);
                }
            })
    }





    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} >Nueva Entrada</Title>
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
