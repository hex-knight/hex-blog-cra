import React, { Component } from 'react';
import './QuillEditor.css';
import ReactQuill from 'react-quill';
import "../../../node_modules/react-quill/dist/quill.snow.css";

class QuillEditor extends Component {
    constructor (props) {
      super(props)
      this.state = { editorHtml: '' }
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange (html) {
        this.setState({ editorHtml: html });
        this.props.onEditorChange(this.state.editorHtml);
    }
    
    render () {
      return (
        <div>
        <ReactQuill 
          theme={'snow'}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={modules}
          formats={formats}
          placeholder={this.props.placeholder}
          bounds={'.app'}
          style={{ color: 'black'}}
         />
         </div>
       )
    }
  }
  
  /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [ {'align':''}, {'align':'right'},
        { 'align': 'center'},{'align':'justify'}],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['code-block'],
      ['clean']
    ]
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align','list', 'bullet', 'indent',
    'link', 'image', 'video', 'code-block'
  ]
  


export default QuillEditor;



