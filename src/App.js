import './App.css';
import React, { Component } from 'react'
import Navbar from './componets/Navbar';
import News from './componets/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />

          <div>
            <Routes>
            <Route exact path='/' element={<News pageSize={5} country="in" category="general" />}></Route>
              <Route exact path='/business' element={<News pageSize={5} country="in" category="business" />}></Route>
              <Route exact path='/entertainment' element={<News pageSize={5} country="in" category="entertainment" />}></Route>
              <Route exact path='/general' element={<News pageSize={5} country="in" category="general" />}></Route>
              <Route exact path='/health' element={<News pageSize={5} country="in" category="health" />}></Route>
              <Route exact path='/Science' element={<News pageSize={5} country="in" category="Science" />}></Route>
              <Route exact path='/sports' element={<News pageSize={5} country="in" category="sports" />}></Route>
              <Route exact path='/Technology' element={<News pageSize={5} country="in" category="Technology" />}></Route>          
            </Routes>
          </div>

        </Router>
      </> 
    )
  }
}