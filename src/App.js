import React from 'react';
import './index.css';
import NavLogo from './assets/nav-logo.png';
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
 } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "XjHJUQZaxyOza9MyfhEX";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    const newPost = {
      ...post,
      title: "Land a $400k job"
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "XjHJUQZaxyOza9MyfhEX";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid, 
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "1")
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user.email[0].toUpperCase());
      if (user) {
        setUser(user);
      }
    })
  }, []);

  function login() {
  signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(({ user }) => {
      console.log(user);
      setUser(user);
    })
    .catch((error) => {
      console.log(error);
    })
}

  function register() {
    console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }
  
  return (
    <div className="App">
          <nav>
            <div className="nav__container">
              <a href="/">
              <img src={NavLogo} alt="" className="logo" />
              </a>
              <ul className="nav__links">
                <li className="nav__list">
                  <button onClick={login} className="nav__btn--purple">
                  Login
                  </button>
                </li>
                <li className="nav__list">
                  <button onClick={register} className="nav__btn--purple">
                  Register
                  </button>
                </li>
                <li className="nav__list">
                  <button onClick={logout} className="btn">
                    <span>E</span>
                  </button>
                  <div className="email__results">
                    {loading ? 'loading...' : user.email}
                  </div>
                </li>
                <li className="nav__list">
                  <button onClick={createPost} className="nav__btn--gray">Create Post</button>
                </li>
                <li className="nav__list">
                  <button onClick={getAllPosts} className="nav__btn--gray">Get All Posts</button>
                </li>
                <li className="nav__list">
                  <button onClick={getPostById} className="nav__btn--gray">Get Post By Id</button>
                </li>
                <li className="nav__list">
                  <button onClick={getPostByUid} className="nav__btn--gray">Get Post By Uid</button>
                </li>
                <li className="nav__list">
                  <button onClick={updatePost} className="nav__btn--gray">Update Post</button>
                </li>
                <li className="nav__list">
                  <button onClick={deletePost} className="nav__btn--gray">Delete Post</button>
                </li>
              </ul>
             </div>
            </nav>
    </div>
  );
}

export default App;
