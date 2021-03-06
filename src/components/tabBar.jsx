import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

const TabBar = props => (
  <Tabs
    value={props.selected}
    onChange={props.handleChange}
    indicatorColor="primary"
    textColor="primary"
    centered
  >
    <Tab label="All" />
    <Tab
      label={
        <Badge style={{ padding: '0 15px' }} color={props.activeTodoCount > 0 ? 'secondary' : 'default'} badgeContent={props.activeTodoCount}>
          Active
        </Badge>
    }
    />
    <Tab label="Completed" />
  </Tabs>
);


TabBar.propTypes = {
  selected: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  activeTodoCount: PropTypes.number.isRequired
};

export default TabBar;
