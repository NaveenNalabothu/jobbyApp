import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const Protection = props => {
  const x = Cookies.get('jwt_token')
  if (x === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default Protection
