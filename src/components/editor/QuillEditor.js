import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "../../../node_modules/react-quill/dist/quill.snow.css";
import axios from 'axios';
import firebase from 'firebase';
import './QuillEditor.css';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

const QuillClipboard = Quill.import('modules/clipboard');


class Clipboard extends QuillClipboard {

    getMetaTagElements = (stringContent) => {
        const el = document.createElement('div');
        el.innerHTML = stringContent;
        return el.getElementsByTagName('meta');
    };

    async onPaste(e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = await clipboardData.getData('Text');

        const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
        if (urlMatches.length > 0) {
            e.preventDefault();
            urlMatches.forEach(link => {
                axios.get(link)
                    .then(payload => {
                        // let title, image, url, description;
                        let title, image, url;
                        for (let node of this.getMetaTagElements(payload)) {
                            if (node.getAttribute("property") === "og:title") {
                                title = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:image") {
                                image = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:url") {
                                url = node.getAttribute("content");
                            }
                            // if (node.getAttribute("property") === "og:description") {
                            //     description = node.getAttribute("content");
                            // }
                        }

                        const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

                        let range = this.quill.getSelection();
                        let position = range ? range.index : 0;
                        this.quill.pasteHTML(position, rendered, 'silent');
                        this.quill.setSelection(position + rendered.length);
                    })
                    .catch(error => console.error(error));
            });

        } else {
            //console.log('when to use this') 보통 다른 곳에서  paste 한다음에  copy하면 이쪽 걸로 한다. 
            super.onPaste(e);
        }
    }

}
Quill.register('modules/clipboard', Clipboard, true);

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('width', '100%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {

    static create(value) {
        if (value && value.src) {
            const videoTag = super.create();
            videoTag.setAttribute('src', value.src);
            videoTag.setAttribute('title', value.title);
            videoTag.setAttribute('width', '100%');
            videoTag.setAttribute('controls', '');

            return videoTag;
        } else {
            const iframeTag = document.createElement('iframe');
            iframeTag.setAttribute('src', value);
            iframeTag.setAttribute('frameborder', '0');
            iframeTag.setAttribute('allowfullscreen', true);
            iframeTag.setAttribute('width', '100%');
            return iframeTag;
        }
    }

    static value(node) {
        if (node.getAttribute('title')) {
            return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
        } else {
            return node.getAttribute('src');
        }
        // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
    }

}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "첨부파일 - ";

        const bTag = document.createElement('b');
        //위에 첨부파일 글자 옆에  파일 이름이 b 태그를 사용해서 나온다.
        bTag.innerText = value;

        const linkTag = document.createElement('a');
        linkTag.setAttribute('href', value);
        linkTag.setAttribute("target", "_blank");
        linkTag.setAttribute("className", "file-link-inner-post");
        linkTag.appendChild(bTag);
        //linkTag 이런식으로 나온다 <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

        const node = super.create();
        node.appendChild(prefixTag);
        node.appendChild(linkTag);

        return node;
    }

    static value(node) {
        const linkTag = node.querySelector('a');
        return linkTag.getAttribute('href');
    }

}

FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "투표 - ";

        const bTag = document.createElement('b');
        bTag.innerText = value.title;

        const node = super.create();
        node.setAttribute('id', value.id);
        node.appendChild(prefixTag);
        node.appendChild(bTag);

        return node;
    }

    static value(node) {
        const id = node.getAttribute('id');
        const bTag = node.querySelector('b');
        const title = bTag.innerText;
        return { id, title };
    }

}

PollBlot.blotName = 'poll';
PollBlot.tagName = 'p';
PollBlot.className = 'poll-inner-post';
Quill.register(PollBlot);

class QuillEditor extends React.Component {


    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;


    constructor(props) {
        super(props);

        this.state = {
            picture: null,
            uploadValue: 0,
            editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
            files: [],
            apiUrl: process.env.NODE_ENV === 'production' ?
                "https://hex-blog-backend.herokuapp.com/" :
                "http://localhost:5000/"
        };

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (html) => {
        //console.log('html', html)
        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    // I V F P들을  눌렀을떄 insertImage: this.imageHandler로 가서  거기서 inputOpenImageRef를 클릭 시킨다. 
    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () => {
        this.inputOpenVideoRef.current.click();
    };

    fileHandler = () => {
        this.inputOpenFileRef.current.click();
    };


    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            //firebase upload
            const storageRef = firebase.storage()
                .ref(`/BlogPictures/${file.name}`);
            //after file is uploaded, you can now retrieve it
            const task = storageRef.put(file).then(
                () => {
                    storageRef.getDownloadURL().then(url => {
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();
                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "image", { src: url, alt: file.name });
                        quill.setSelection(position + 1);
                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    })
                }).catch(
                    error => {
                        console.log(error.error)
                    }
                );
        console.log(task);
        }
    };
    render() {
        return (
            <div className="container">
                <div id="toolbar">
                    <select class="ql-size"
                        defaultValue={""}
                        onChange={e => e.persist()}
                    >
                        <option value="small"></option>
                        <option selected></option>
                        <option value="large">Header 2</option>
                        <option value="huge">Header 1</option>
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-image" />
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />
                    <select class="ql-align"
                        defaultValue={""}
                        onChange={e => e.persist()}
                    >
                        <option selected></option>
                        <option value="right">Header 2</option>
                        <option value="center"></option>
                        <option value="justify">Header 1</option>
                    </select>

                </div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                    style={{ color: 'black'}}
                />
                <input type="file" accept="image/*" 
                ref={this.inputOpenImageRef} 
                style={{ display: "none" }} 
                onChange={this.insertImage} />
            </div>
        )
    }

    modules = {
        ImageResize:{
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
            handleStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
            },
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
                // other camelCase styles for size display
            },
            toolbarStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
                // other camelCase styles for size display
            }


        },
        toolbar: {
            container: "#toolbar",
            handlers: {
                image: this.imageHandler,
                insertPoll: this.pollHandler,
            }
        },

    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'image', 'link', "code-block", "video", "blockquote", "clean",
        'size', 'align'
    ];
}

export default QuillEditor;