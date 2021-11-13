// import logo from './logo.svg';
// import './App.css';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';
import { Button,Container,Form,Card,Alert } from 'react-bootstrap';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,FacebookAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile   } from "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();


function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSingIn: false,
    email : '',
    name : '',
    photo : '',
    password: '',
    newUser : false,
    signUpSuccess : '',
    signUpError: '',
    loginSuccess : '',
    loginError: '' 
 });

 const [loggedInUser, setloggedInUser] = useContext(UserContext);
 


//  console.log(user);

 const handleFacebookSignIn = () =>{
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      console.log(errorMessage);
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      // ...
    });
 }

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result)
      const user = result.user;
      const {email,displayName,photoURL} = user;
      const signedInUser = {
        isSingIn: true,
        email : email,
        name : displayName,
        photo : photoURL
      }
      setUser(signedInUser);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const handleSignOut = () =>{
     signOut(auth).then(() => {
      const signedOutUser = {
        isSingIn: false,
        email : '',
        name : '',
        photo : '',

        // error: false

      }
      setUser(signedOutUser)
      }).catch((error) => {
        // An error happened.
      });
  }
  const handleSubmit = (e) => {
      if(newUser && user.name && user.email){
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed in 
          console.log(res.user);
          const newUserInfo = {...user};
          newUserInfo.signUpSuccess = 'SignUp Successfully';
          setUser(newUserInfo);
          updataUserName(user.name);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const newUserInfo = {...user}
          newUserInfo.signUpError = errorMessage;
          setUser(newUserInfo)
          setloggedInUser(newUserInfo);
          // ..
        });
      }
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
              // Signed in 
                console.log(res);
                const newUserInfo = {...user};
                newUserInfo.loginSuccess = 'User Logged in Successfully';
                setUser(newUserInfo);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const newUserInfo = {...user};
              newUserInfo.loginError = errorMessage;
              setUser(newUserInfo);
              
            });
      }
     
      e.preventDefault();
      const updataUserName = (name) =>{
        updateProfile(auth.currentUser, {
          displayName: name, 
        }).then(() => {
          // Profile updated!
          console.log("user name update successfully");
          // ...
        }).catch((error) => {
          // An error occurred
          console.log(error);
          // ...
        });
      }
  }
  const handleChange = (e) =>{
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value ;
      setUser(newUserInfo);
      
    }
  }
  
  return (
    <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }} >
        <div className="w-100" style={{ maxWidth: "400px" }} >
          <Card >
            <Card.Body>
              <Form onSubmit={handleSubmit} >
                {user.signUpSuccess > 1 ? <Alert variant="success" >{user.signUpSuccess}</Alert>: user.signUpSuccess}
                {user.signUpError>1 ? <Alert variant="danger" >{user.signUpError}</Alert>: user.signUpError}
                {user.loginError>1 ? <Alert variant="danger" >{user.loginError}</Alert>: user.loginError}
                {user.loginSuccess>1 ? <Alert variant="success" >{user.loginSuccess}</Alert>: user.loginSuccess}
  
                {newUser && <Form.Group id="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control name="name" onBlur={handleChange} type="text"  required />
                </Form.Group> }
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" onBlur={handleChange} type="email"  required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" onBlur={handleChange} type="password"  required />
                </Form.Group>
                <Button  className="w-100 mt-3" type="submit">
                  Sign Up
                </Button>
                <Form.Group className="mb-3 mt-2" controlId="formBasicCheckbox">
                  <Form.Check name="newUser" onChange={() => setNewUser(!newUser)} type="checkbox" label="New user Registration" />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <p>Continue With Google? <a style={{cursor:'pointer',color: 'blue'}} onClick={handleGoogleSignIn} >Log In</a></p>
            {/* <p>Continue With facebook? <a style={{cursor:'pointer',color: 'blue'}} onClick={handleFacebookSignIn} >Log In</a></p> */}
          </div>
        </div>
    </Container>
    
  );
}

export default Login;
