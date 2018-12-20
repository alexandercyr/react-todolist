import React from 'react';
import PropTypes from 'prop-types';

const Row = props => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.completed ? 'X' : 'O'}</p>
  </div>
);

Row.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

export default Row;
