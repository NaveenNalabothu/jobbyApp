import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({isError: true, errMsg: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isError, errMsg} = this.state
    const logoImg = 'https://assets.ccbp.in/frontend/react-js/logo-img.png '
    return (
      <div className="whole">
        <div className="loginFrom">
          <div>
            <img alt="website logo" src={logoImg} />
            <form type="submit" onSubmit={this.submitForm}>
              <label htmlFor="Username">USERNAME</label>
              <input
                onChange={this.changeUsername}
                id="Username"
                value={username}
                placeholder="Username"
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                onChange={this.changePassword}
                type="password"
                id="password"
                value={password}
                placeholder="Password"
              />
              <button type="submit">Login</button>
              {isError && <p>{errMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
