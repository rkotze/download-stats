import React, { PropTypes } from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/app.style';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

function App({ children, routes }) {

  return (
    <div style={s.root}>
      <h1 style={s.title}>Download stats</h1>
      <nav style={s.mapMenu}>
        <Link to={homeRoute}>Home</Link>
      </nav>
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
