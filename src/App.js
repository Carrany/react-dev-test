import './App.css';
import { Router, Switch, Route } from 'react-router-dom'

import { history } from '_utils/history';
import { routes } from 'pages';

function App(props) {
  return (
    <Router history={history}>
      <Switch>
        {routes.map(route =>
          <Route
            path={route.path}
            exact={route.exact}
            component={props => <route.component {...props} />}
          />
        )}
      </Switch>

    </Router>
  );
}

export default App;
