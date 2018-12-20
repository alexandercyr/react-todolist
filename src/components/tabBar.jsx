import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabBar = props => (
  <Tabs
    value={props.selected}
    onChange={props.handleChange}
    indicatorColor="primary"
    textColor="primary"
    centered
  >
    <Tab label="All" />
    <Tab label="Active" />
    <Tab label="Completed" />
  </Tabs>
  );


TabBar.propTypes = {
  selected: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

module.exports = TabBar;
