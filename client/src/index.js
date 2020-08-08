import React, { Suspense, lazy } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Loader from './components/loader/index'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AuthProvider } from './global/useAuth'
import 'bootstrap/scss/bootstrap.scss'
import 'react-toastify/dist/ReactToastify.css'
import './global.scss'
const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const PrivateRouteExample = lazy(() => import('./pages/privateRoute'))
const PublicRouteExample = lazy(() => import('./pages/publicRoute'))
const Post = lazy(() => import('./pages/post'))
const NotFound = lazy(() => import('./pages/notFound'))


ReactDOM.render(
  <AuthProvider>
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/post" component={Post} />
          <Route path="/private-route" component={PrivateRouteExample} />
          <Route path="/public-route" component={PublicRouteExample} />
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

