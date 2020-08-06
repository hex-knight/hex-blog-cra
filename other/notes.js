// Se pude mandar a llamar el login de Google usando Firebase.
// Datos importantes que regresa el `result`:
const result={
    displayName: string,
    email: string,
    emailVerified: bool,
    phoneNumber: string/null,
    photoUrl: string,
}
[
    {
        role:"Admin",
        group:"AdmingBG"
    },
    {
        role:"Verigficator",
        group:"VerificatorBG"
    },
    {
        role:"Validator",
        group:"ValidatorBG"
    }
]
//TO RETRIEVE AN IMAGE WITH THE FILENAME
// const storageRef = firebase.storage()
//             .ref(`/BlogPictures/${file.name}`);
// const task = storageRef.put(file).then(
            //     () => {
            //         storageRef.getDownloadURL().then( 
            //             url => this.setState({picture:url})
            //         )
            //     }
            // );

//----------------------------------------

//TO SAVE AND RETRIEVE THE PIC TO THE BACKEND
 // axios.post(this.state.apiUrl + 'api/blog/uploadfiles', formData, config)
            //     .then(response => {
            //         if (response.data.success) {

            //             const quill = this.reactQuillRef.getEditor();
            //             quill.focus();

            //             let range = quill.getSelection();
            //             let position = range ? range.index : 0;

            //             //먼저 노드 서버에다가 이미지를 넣은 다음에   여기 아래에 src에다가 그걸 넣으면 그게 
            //             //이미지 블롯으로 가서  크리에이트가 이미지를 형성 하며 그걸 발류에서     src 랑 alt 를 가져간후에  editorHTML에 다가 넣는다.
            //             quill.insertEmbed(position, "image", { src: this.state.apiUrl + response.data.url, alt: response.data.fileName });
            //             quill.setSelection(position + 1);

            //             if (this._isMounted) {
            //                 this.setState({
            //                     files: [...this.state.files, file]
            //                 }, () => { this.props.onFilesChange(this.state.files) });
            //             }
            //         } else {
            //             return alert('failed to upload file')
            //         }
            //     })
//----------------------------------------
//To Add a Spotify Song to the HTML body:
{/*             <iframe 
                    src="SONG URL" 
                    width="600" 
                    height="80" 
                    frameborder="0" 
                    allowtransparency="true" allow="encrypted-media">
                </iframe> 
*/}



//----------------------------Firebase Cloud Storage----------------
// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read, write: if request.auth != null;
//       }
//     }
//   }
