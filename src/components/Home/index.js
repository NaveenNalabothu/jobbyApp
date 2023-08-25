import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    let x
    return (
      <div className="x">
        <Header />
        <div className="home">
          <h1 className="y">Find The Job That Fits Your Life</h1>
          <p className="y">
            Millions of people are searching for jobs,salary information
            ,company reviews.
            <br />
            Find the job job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button className="button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
