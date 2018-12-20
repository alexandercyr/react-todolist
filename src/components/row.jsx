import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Row = props => (
  <div className="row">
    <Checkbox
      checked={props.completed}
      onChange={props.handleChecked(props.id)}
      color="primary"
    />
    <p>{props.title}</p>
    <IconButton
      aria-label="Delete"
      onClick={() => props.handleDeleted(props.id)}
    >
      <DeleteIcon />
    </IconButton>
  </div>
);

Row.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleDeleted: PropTypes.func.isRequired
};

export default Row;
