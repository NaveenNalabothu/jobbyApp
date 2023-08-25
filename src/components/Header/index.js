import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const url = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'
  const logout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <div className="header">
      <Link to="/">
        <img src={url} alt="website logo" />
      </Link>
      <ul>
        <li>
          <Link to="/">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <p>Jobs</p>
          </Link>
        </li>
        <li>
          <button onClick={logout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
