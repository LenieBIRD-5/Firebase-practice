import React from 'react';
import './index.css';
import NavLogo from './assets/nav-logo.png';
import { auth } from "./firebase/init";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
 } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
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
            <button onClick={login} className="nav__btn--login">
            Login
            </button>
          </li>
          <li className="nav__list">
            <button onClick={register} className="nav__btn--register">
            Register
            </button>
          </li>
          <li className="nav__list">
            <button onClick={logout} className="btn">
              <span>E</span>
            </button>
            {loading ? 'loading...' : user.email}
          </li>
                </ul>
            </div>
        </nav>
    </div>
  );
}

export default App;
