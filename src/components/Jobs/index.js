import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import EachJob from '../EachJob'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const states = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FILED',
}

class Jobs extends Component {
  state = {
    profileFail: states.initial,
    jobStatus: states.initial,
    profile: {},
    types: [],
    salary: '',
    searchText: '',
    allJobs: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobStatus: states.loading})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    let url = 'https://apis.ccbp.in/jobs'
    let m = false
    const {types, salary, searchText} = this.state
    const allTypes = types.join()
    if (allTypes !== '') {
      url = `${url}?employment_type=${allTypes}`
      m = true
    }
    if (salary !== '') {
      if (m) {
        url = `${url}&minimum_package=${salary}`
      } else {
        url = `${url}?minimum_package=${salary}`
      }
      m = true
    }
    if (searchText !== '') {
      if (m) {
        url = `${url}&search=${searchText}`
      } else {
        url = `${url}?search=${searchText}`
      }
    }

    console.log(url)
    const data = await fetch(url, options)
    if (data.ok === true) {
      const response = await data.json()
      const {jobs} = response

      this.setState({allJobs: jobs, jobStatus: states.success})
    } else {
      this.setState({jobStatus: states.failed})
    }
  }

  getProfile = async () => {
    this.setState({profileFail: states.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const data = await fetch('https://apis.ccbp.in/profile', options)
    if (data.ok === true) {
      const x = await data.json()
      const profile = x.profile_details

      const modified = {
        name: profile.name,
        image: profile.profile_image_url,
        bio: profile.short_bio,
      }
      this.setState({profile: modified, profileFail: states.success})
    } else {
      this.setState({profileFail: states.failed})
    }
  }

  employmentTypeChange = event => {
    const {checked, value} = event.target
    if (checked === true) {
      this.setState(prev => ({types: [...prev.types, value]}), this.getJobs)
    } else {
      this.setState(
        prev => ({types: prev.types.filter(val => val !== value)}),
        this.getJobs,
      )
    }
  }

  changeSalary = event => {
    this.setState({salary: event.target.value}, this.getJobs)
  }

  changeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  searchClick = () => {
    this.getJobs()
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {allJobs} = this.state
    if (allJobs.length === 0) {
      return (
        <>
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
        </>
      )
    }
    return (
      <ul>
        {allJobs.map(item => (
          <li key={item.id}>
            <EachJob details={item} />
          </li>
        ))}
      </ul>
    )
  }

  renderProfileSuccess = () => {
    const {profile} = this.state
    const {bio, image, name} = profile
    return (
      <div className="profile">
        <img alt="profile" src={image} />
        <p>{bio}</p>
        <h1>{name}</h1>
      </div>
    )
  }

  renderFailedViewP = () => {
    const retryClick = () => {
      this.getProfile()
    }
    return (
      <button onClick={retryClick} type="button">
        Retry
      </button>
    )
  }

  renderFailedViewJ = () => {
    const retryClick = () => {
      this.getJobs()
    }
    return (
      <>
        <h1>Oops! Something Went Wrong</h1>
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        />
        <button onClick={retryClick} type="button">
          Retry
        </button>
        <p>We cannot seem to find the page you are looking for</p>
      </>
    )
  }

  renderJobsComponent = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case states.loading:
        return this.renderLoader()

      case states.success:
        return this.renderAllJobs()

      case states.failed:
        return this.renderFailedViewJ()

      default:
        return null
    }
  }

  renderProfile = () => {
    const {profileFail} = this.state
    switch (profileFail) {
      case states.loading:
        return this.renderLoader()

      case states.success:
        return this.renderProfileSuccess()

      case states.failed:
        return this.renderFailedViewP()

      default:
        return null
    }
  }

  render() {
    const {searchText} = this.state

    return (
      <div className="jobs">
        <Header />
        <div className="jobsUnderHeader">
          <div className="leftSide">
            {this.renderProfile()}
            <hr className="line" />
            <div>
              <h1 className="paraStyle">Type of Employment</h1>
              <ul className="list">
                {employmentTypesList.map(item => {
                  console.log()
                  return (
                    <li key={item.employmentTypeId} className="input">
                      <input
                        onChange={this.employmentTypeChange}
                        htmlFor={item.employmentTypeId}
                        type="checkbox"
                        label={item.label}
                        value={item.employmentTypeId}
                      />
                      <label id={item.employmentTypeId} className="paraStyle">
                        {item.label}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
            <hr className="line" />
            <div>
              <h1 className="paraStyle">Salary Range</h1>
              <form className="list">
                <ul>
                  {salaryRangesList.map(item => {
                    console.log()
                    return (
                      <li key={item.salaryRangeId} className="input">
                        <input
                          name="myGroupName"
                          onChange={this.changeSalary}
                          htmlFor={item.salaryRangeId}
                          type="radio"
                          label={item.label}
                          value={item.salaryRangeId}
                        />
                        <label id={item.salaryRangeId} className="paraStyle">
                          {item.label}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </form>
            </div>
          </div>
          <div className="rightSide">
            <div className="input">
              <input
                placeholder="Search"
                type="search"
                value={searchText}
                onChange={this.changeSearch}
              />

              <button
                onClick={this.searchClick}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsComponent()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
