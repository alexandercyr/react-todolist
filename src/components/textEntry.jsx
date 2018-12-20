import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const TextEntry = props => (
  <div styleName="text-entry-container">
    <FormControl fullWidth>
      <TextField
        label="What to do..."
        className="text-field"
        value={props.value}
        onChange={props.handleChange('textfield')}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        className="add-btn"
        onClick={e => props.handleAdd(e.target.value)}
      >
          Add Todo
        </Button>
    </FormControl>

  </div>
);

TextEntry.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default TextEntry;
