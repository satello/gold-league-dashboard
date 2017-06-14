import React from 'react';
import ReactDOM from 'react-dom';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import {Router, browserHistory} from 'react-router';

// routes
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './App';
import Dashboard from './views/dashboard';

// pages
import Login from './views/pages/login';
import Register from './views/pages/register';
import ForgetPass from './views/pages/forget';
import Page404 from './views/pages/404';
import Calendar from './views/pages/calendar';
import Availabilities from './views/pages/availabilities';
import Commodities, {CommoditiesTable, EditCommodity, NewCommodity} from './views/pages/commodities';


// import main style dependency file
import './styles/index.scss';

// Import the reducers
import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';


const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        defaultPosition="right"
        defaultIsVisible={false}
    >
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
);

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    )
);

const history = syncHistoryWithStore(browserHistory, store);

class Index {
    constructor() {
        this.isInitialized = false;
        this.isLoggedIn = false;
        this.isOnboarding = false;
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.initializeApp());
    }

    onStoreUpdate() {
        const {isInitialized, isLoggedIn, isOnboarding} = store.getState().appState;
        if (this.isInitialized !== isInitialized) {
            this.isInitialized = isInitialized;
            this.startApp();
        }
        if(this.isLoggedIn !== isLoggedIn) {
            this.isLoggedIn = isLoggedIn;
        }
        if(this.isOnboarding !== isOnboarding) {
            this.isOnboarding = isOnboarding;
        }
    }

    requireAuth = (nextState, replace) => {
        if (!this.isLoggedIn) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        if (this.isOnboarding) {
            replace({
                pathname: '/onboarding/1'
            })
        }
    }

    startOnboarding = (nextState, replace) => {
        if (!this.isLoggedIn) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    checkForAuthCode = (nextState, replace) => {
        // if user is logged in don't show them login page
        if(this.isLoggedIn) {
            replace({
                pathname: '/'
            })
        }
    }

    checkForPaypalEmail(nextState, replace) {
        if(nextState.location.query.paypalEmail) {
            replace({
                pathname: nextState.location.pathname,
                state: { paypalEmail: nextState.location.query.paypalEmail }
            })
        }
    }

    startApp() {
      ReactDOM.render(
        <Provider store={store}>
          <div>
            <Router history={history}>
              <Route component={App} path='/'>
                  <IndexRoute component={Dashboard}/>
                  <Route path="calendar" component={Calendar}/>
                  <Route path="availabilities" component={Availabilities}/>
                  <Route path="commodities" component={Commodities}>
                    <IndexRoute component={CommoditiesTable} />
                    <Route path="new" component={NewCommodity} />
                    <Route path=":id" component={EditCommodity} />
                  </Route>
              </Route>
              <Route component={Login} path="/login" onEnter={this.checkForAuthCode}/>
              <Route component={Register} path="/register"/>
              <Route component={ForgetPass} path="/forget"/>
              {/* default */}
              <Route component={Page404} path="404"/>
              <Redirect from="*" to="404"/>
            </Router>/>
            <DevTools />
          </div>
        </Provider>,
        document.getElementById('root')
      );
    }
}

new Index();
