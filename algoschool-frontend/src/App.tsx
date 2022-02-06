import React, { useEffect } from 'react';
import Course from './Components/Course/Course';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './Components/About/About';
import Problem from './Components/Problem/Problem';
import Article from './Components/Article/Article';
import { useDispatch, useSelector } from 'react-redux';
import firebase from './firebase';
import { login, logout, setDarkMode } from './Actions/user';
import { fetchCourse } from './Actions/course';
import { getDarkMode } from './Selectors/user';


function App() {
  const dispatch = useDispatch()
  const darkMode = useSelector(getDarkMode)
  dispatch(setDarkMode(darkMode))
  useEffect(() => {
    dispatch(fetchCourse)
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        if (user){
            dispatch(login(user))
            user.getIdToken().then(function(idToken) {  // <------ Check this line
              console.log(idToken); // It shows the Firebase token now
              return idToken;
          })
        } else {
            dispatch(logout())
        }
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/problem/:id">
          <Problem/>
        </Route>
        <Route path="/article/:id">
          <Article/>
        </Route>
        <Route path="/">
          <Course/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
