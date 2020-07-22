import React, { useState } from 'react'
import { Typography, Button, Form } from 'antd';
import QuillEditor from '../../../editor/QuillEditor';
//import axios from 'axios';
const { Title } = Typography;

export default function CreateBlog() {
    const [content, setContent] = useState("");
    //const [files, setFiles] = useState([]);

    const onEditorChange = (value) => {
        setContent(value);
    }
    
    const onSubmit = (event) =>{
        event.preventDefault();
        setContent("");

        const variables ={
            content: content,
            userID: "111"//user.userData._id
        }

        // axios.post('/api/blog/createPost',variables).
        // then( response => {
        //     console.log(response);
        // });
        console.log("Datos: ",variables);
    }





    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} >Nueva Entrada</Title>
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                // onFilesChange={onFilesChange}
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
