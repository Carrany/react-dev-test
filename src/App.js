import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { history } from '_utils/history';
import { routes } from 'pages';
import { store } from '_utils/store';

function App(props) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {routes.map((route, index) =>
            <Route
              path={route.path}
              exact={route.exact}
              key={index}
              component={props => <route.component {...props} />}
            />
          )}
        </Switch>

      </Router>
    </Provider>
  );
}

export default App;
