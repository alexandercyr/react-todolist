import React from 'react';
import PropTypes from 'prop-types';

import Row from './row';

const Table = props => props.rows.map(row => <Row title={row.text} selected={row.completed} />);

Table.defaultProps = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

export default Table;
