import React, { PropTypes } from 'react';
import s from '../styles/style';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function PageNotFound({ location }) {
  return (
    <p style={s.p}>
      Page not found - the path, {location.pathname},
      did not match any React Router routes.
    </p>
  );
}

PageNotFound.propTypes = propTypes;

export default PageNotFound;
