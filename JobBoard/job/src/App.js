import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JobDetail from '/job-board-frontend/JobDetail';

function App() {
  return (
    <Router>
      <Route exact path="/" component={JobList} />
      <Route path="/jobs/:id" component={JobDetail} />
    </Router>
  );
}

export default App;