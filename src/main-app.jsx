const React = require('react');
const ReactDOM = require('react-dom');
const Index = require('./pages/Index');

const components = {
  index: Index
};

require('./styles/app.scss');


function mainApp() {
  const el = document.getElementById('app');
  const view = el.dataset.view;
  const data = JSON.parse(el.dataset.props);
  data.selected = view;

  ReactDOM.render(
    React.createElement(components[view], data),
    el,
  );
}


document.addEventListener('DOMContentLoaded', mainApp);
