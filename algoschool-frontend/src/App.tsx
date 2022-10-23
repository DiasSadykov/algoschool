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
import AdminAddCourseBlockForm from './Components/AdminAddCourseBlockForm/AdminAddCourseBlockForm';
import AdminAddArticleForm from './Components/AdminAddArticleForm/AdminAddArticleForm';
import AdminAddProblemForm from './Components/AdminAddProblemForm/AdminAddProblemForm';
import AdminChangeProblemForm from './Components/AdminChangeProblemForm/AdminChangeProblemForm';
import AdminChangeArticleForm from './Components/AdminChangeArticleForm/AdminChangeArticleForm';


function App() {
  const dispatch = useDispatch()
  const darkMode = useSelector(getDarkMode)
  dispatch(setDarkMode(darkMode))
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        if (user){
            dispatch(login(user))
            user.getIdToken().then(function(idToken) {  // <------ Check this line
              return idToken;
          })
        } else {
            dispatch(logout())
        }
    });
    dispatch(fetchCourse)
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/admin/add-course-block">
          <AdminAddCourseBlockForm/>
        </Route>
        <Route path="/admin/add-article">
          <AdminAddArticleForm/>
        </Route>
        <Route path="/admin/add-problem">
          <AdminAddProblemForm/>
        </Route>
        <Route path="/admin/change-article/:id">
          <AdminChangeArticleForm/>
        </Route>
        <Route path="/admin/change-problem/:id">
          <AdminChangeProblemForm/>
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
