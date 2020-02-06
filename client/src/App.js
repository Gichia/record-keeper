import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/header/header.component';
import About from './components/pages/about/about.component';
import HomePage from './components/pages/homepage/homepage.component';

import RecordState from './context/records/record.state';

import './App.css';

const App = () => {
  return (
    <RecordState>
      <Router>
        <React.Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>  
        </React.Fragment>
      </Router>
    </RecordState>
  );
}

export default App;
