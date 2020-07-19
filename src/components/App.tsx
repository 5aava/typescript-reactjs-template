import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './../components/Home';
import Create from './../components/students/Create';
import EditStudent from './../components/students/Edit';

import "./../assets/scss/App.scss";
import './../assets/css/App.css';


class App extends React.Component<{}, undefined> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/create'}> Create Student </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditStudent} />
        </Switch>
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(App);

