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
      <h1 style={s.title}>Richard Kotze Github repo stats</h1>
      <nav style={s.mapMenu}>
        <Link style={s.link.normal} to={homeRoute}><i className="fa fa-home fa-lg" aria-hidden="true"></i></Link>
      </nav>
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
