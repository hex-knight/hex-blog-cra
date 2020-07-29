import React, { useState } from 'react'
import {
    Typography, Button,
    Divider,
    Upload, message
} from 'antd';
import QuillEditor from '../../../editor/QuillEditor';
//import axios from 'axios';
import './CreateBlog.css';
import { Input } from '@material-ui/core';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import EditableTagGroup from '../../../commons/Tags/EditableTagGroup';
import ImgCrop from 'antd-img-crop';
import firebase from 'firebase';
import moment from 'moment';
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
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);

    //---------------Functions
    //
    //--------Cover Functions
    const handleChange = (info) => {
        const file = info.file.originFileObj;
        setCoverPic(file);
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
        console.log(value);
        setContent(value);
    }
    const onFilesChange = (files) => {
        console.log("Files: ", files);
    }
    //
    //-----Validate if the form can be saved 
    const validateForm = () =>{
        console.log(tags);
        if((content!==''&&content!=='<p><br></p>')&&tags.length!==0){
            onSubmit();
        }
        else{
            message.error("Favor de escribir contenido y llenar al menos una etiqueta");
        }
    }
    //
    //-------Submit Functions
    async function onSubmit(event){
        const key = 'updatable';
        let variables = {};
        message.loading({ content: 'Loading...', key });
        const dbRef = firebase.database().ref('Blogs');
        const newEntry = dbRef.push();
        if(cover){
        const file = coverPic;
        const storageRef = firebase.storage()
            .ref(`/BlogPictures/${file.name}`);
        const task = storageRef.put(file).then(
            () => {
                storageRef.getDownloadURL().then(url => {
                    setCover(url);
                    variables = {
                        cover: url,
                        contenido: content,
                        userId: props.curUser.id,
                        titulo: title,
                        tags: tags,
                        fecha: moment(Date.now()).format("DD-MM YYYY")
                    }
                    console.log("Values: ",variables);
                    newEntry.set(variables,
                        function(error) {
                            if (error) {
                                message.error({ content: 'Error!', key, duration: 2 });
                            } else {
                                message.success({ content: 'Guardado!', key, duration: 2 });
                                
                            }
                        });
                })
                console.log(task);
            }).catch(
                error => {
                    message.error('Ocurrió un error al subir la portada');
                    setCover('');
                    console.log(error.error);
                    return;
                }
            );
        }else{
            variables = {
                cover: '',
                contenido: content,
                userId: props.curUser.id,
                titulo: title,
                tags: tags,
                fecha: moment(Date.now()).format("DD-MM YYYY")
            }
            console.log("Values ", variables);
        }
        newEntry.set(variables,
            function(error) {
                if (error) {
                    message.error({ content: 'Error!', key, duration: 2 });
                } else {
                    message.success({ content: 'Guardado!', key, duration: 2 });
                    setTimeout(
                        window.location="/",
                        1500
                    );
                }
            });
        
    }
    //
    //--------Tags Functions
    const onTagsChange = (tags) => {
        setTags(tags);
    }
    //
    //---------------------------------RENDER
    const hasAccess = props.isAuth && (process.env.NODE_ENV==='development'||
    (process.env.NODE_ENV==='production' &&
    process.env.REACT_APP_CREATOR_ID===props.curUser.id));
    if (hasAccess === false){
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
    else{
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
                    <div classname="tag">
                        <h6>
                            Etiquetas
                        </h6>
                        <EditableTagGroup onTagsChange={onTagsChange} />
                    </div>
                </div>
                <Divider />
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onClick={validateForm}
                        >
                            Publicar
                </Button>
                    </div>
            </div>
        )
    }
}
