const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const React = require('react');
const ReactDom = require('react-dom/server');

const app = express();
const port = 3000;

app.use(morgan('dev'));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, './public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

app.get('/restaurants/:id', (req, res) => {
  // res.sendFile(path.join(__dirname, './public/index.html'));
  // console.log(JSON.stringify(services))

  let components = renderComponents(services, {placeid: req.params.id});
  res.end(Layout(
    'Muncheez',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
