// Se pude mandar a llamar el login de Google usando Firebase.
// Datos importantes que regresa el `result`:
const result={
    displayName: string,
    email: string,
    emailVerified: bool,
    phoneNumber: string/null,
    photoUrl: string,
}
//----------------------------Firebase Cloud Storage----------------
// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read, write: if request.auth != null;
//       }
//     }
//   }
