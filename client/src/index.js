import React, { Suspense, lazy } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Loader from './components/loader/index'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AuthProvider } from './global/globalState'
import 'bootstrap/scss/bootstrap.scss'
import 'react-toastify/dist/ReactToastify.css'
import './global.scss'
const Home = lazy(() => import('./pages/home/index'))
const Login = lazy(() => import('./pages/login/index'))
const Register = lazy(() => import('./pages/register/index'))
const PrivateRouteExample = lazy(() => import('./pages/privateroute/index'))
const NotFound = lazy(() => import('./pages/notFound/index'))


ReactDOM.render(
  <AuthProvider>
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/regiser" component={Register} />
          <Route path="/private-route" component={PrivateRouteExample} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  </AuthProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();