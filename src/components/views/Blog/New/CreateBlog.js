import React, { useState } from 'react'
import {
    Typography, Button, Form,/*, message*/
    Divider,
    Upload, message,
} from 'antd';
import QuillEditor from '../../../editor/QuillEditor';
//import axios from 'axios';
import './CreateBlog.css';
import { Input } from '@material-ui/core';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import EditableTagGroup from '../../../commons/Tags/EditableTagGroup';
import ImgCrop from 'antd-img-crop';
const { Title } = Typography;

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default function CreateBlog(props) {
    //---------------State
    const [content, setContent] = useState("");
    //const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);

    //---------------Functions
    //
    //--------Cover Functions
    const handleChange = (info) => {
        const file = info.file.originFileObj;
        setLoading(true);
        setTimeout(
            () => {
                setCover(URL.createObjectURL(file));
                setLoading(false);
            },
            1000
        )

    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Subir</div>
        </div>
    );
    //
    //--------Title Functions
    const handleTitle = ({ target: { value } }) => {
        setTitle(value);
    }
    //
    //---------Editor Functions
    const onEditorChange = (value) => {
        setContent(value);
    }
    const onFilesChange = (files) => {
        console.log("Files: ", files);
        //ssetPhotos(files);
    }
    //
    //-------Submit Functions
    const onSubmit = (event) => {
        event.preventDefault();
        setContent("");
        const variables = {
            cover: cover,
            content: content,
            userId: props.curUser.id,
            blogTitle: title,
            tags: tags
        }
        console.log("Values ", variables);
    }
    //
    //--------Tags Functions
    const onTagsChange = (tags) =>{
        setTags(tags);
    }
    //
    //---------------------------------RENDER
    if (props.isAuth) {
        return (
            <div style={{ maxWidth: '1500px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2} >
                        Nueva Entrada
                    </Title>
                </div>
                <div className="title-cover">
                    <div className="ipt">
                        <Input placeholder={
                            "Título (opcional)"
                        }
                            allowClear={"true"}
                            value={title}
                            style={{
                                width: '100%',
                                marginTop: '20px'
                            }}
                            onChange={handleTitle}
                        />
                    </div>
                    <div className="upd">
                        <ImgCrop rotate>
                        <Upload
                            name="avatar"
                            className="upd"
                            listType="picture-card"
                            style={{ flexGrow: 2 }}
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {cover ?
                                <img src={cover} alt={cover.name} style={{ width: '100%' }} /> :
                                uploadButton}
                        </Upload>
                        </ImgCrop>
                    </div>
                </div>
                <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                />
                <Divider />
                <div className="tags-cat">
                    <div>
                        <EditableTagGroup onTagsChange={onTagsChange}/>
                    </div>
                </div>
                <Divider />
                <div>
                        <h6>
                            To do:
                    <li>
                                Add size control to the images
                        </li>
                        </h6>
                    </div>
                
                <Form onSubmit={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onSubmit={onSubmit}
                        >
                            Publicar
                </Button>
                    </div>
                </Form>
            </div>
        )
    } else {
        return (
            <div>
                <h4>
                    Acceso denegado
                </h4>
                <Button onClick={
                    () => window.location = "/"
                }>
                    Volver al inicio
                </Button>
            </div>
        )
    }
}
