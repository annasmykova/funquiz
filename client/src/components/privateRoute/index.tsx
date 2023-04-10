import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import Loader from "../Loader";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any
  // tslint:disable-next-line:no-any
  children?: any
  isAvailable: boolean
  loading: boolean
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, children, ...rest } = props

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (props.loading) {
          return <Loader />
        }
        return props.isAvailable ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {from: routeProps.location},
            }}
          />
        )
      }
      }
    />
  )
}

export default PrivateRoute
