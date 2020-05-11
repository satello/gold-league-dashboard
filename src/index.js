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

// real pages
import Rankings from './views/rankings';
import OwnersPage from './views/owners';
import Page404 from './views/404';
import OwnerDetails from './views/owners/details/index.js';
import Weights from './views/weights';


// import main style dependency file
import './styles/index.css';

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
                  <IndexRoute component={Rankings} freeAgents={false}/>
                  <Route path="free-agents" component={Rankings} freeAgents={true} />
                  <Route path="owners" component={OwnersPage} />
                  <Route path="owners/:name" component={OwnerDetails} />
                  <Route path="weights" component={Weights} />
              </Route>
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
