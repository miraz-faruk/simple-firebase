import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {

    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.error("Error during sign-in:", error);
            });
    };

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result); l
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {
                user ?
                    <button onClick={handleSignOut}>Sign Out</button> :
                    <>
                        <button onClick={handleGoogleSignIn}>Google login</button>
                        <button onClick={handleGithubSignIn}>GitHub Login</button>
                    </>
            }
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <p>User email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;
