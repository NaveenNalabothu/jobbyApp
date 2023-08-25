import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Skill from '../Skill'
import './index.css'
import SimilarJob from '../SimilarJob'

const states = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FILED',
}

class JobDetails extends Component {
  state = {data: {}, apiStatus: states.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getJobDetails = async () => {
    this.setState({apiStatus: states.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const data = await fetch(url, options)

    const response = await data.json()
    if (data.ok === true) {
      this.setState({data: response, apiStatus: states.success})
    } else {
      this.setState({apiStatus: states.failed})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs

    return (
      <div>
        <Header />
        <img
          className="img"
          alt="job details company logo"
          src={jobDetails.company_logo_url}
        />
        <p>{jobDetails.title}</p>
        <p>{jobDetails.rating}</p>
        <p>{jobDetails.location}</p>
        <p>{jobDetails.employment_type}</p>
        <p>{jobDetails.package_per_annum}</p>
        <h1>Description</h1>
        <p>{jobDetails.life_at_company.description}</p>
        <img alt="life at company" src={jobDetails.life_at_company.image_url} />
        <a
          href={jobDetails.company_website_url}
          target="_blank"
          rel="noreferrer"
        >
          Visit
        </a>
        <h1>Skills</h1>
        <h1>Life at Company</h1>
        <ul>
          {jobDetails.skills.map(item => (
            <li key={item.name}>
              <Skill details={item} />
            </li>
          ))}
        </ul>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(item => (
            <li key={item.id}>
              <SimilarJob details={item} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailedView = () => {
    const retryClick = () => {
      this.getJobDetails()
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

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case states.loading:
        return this.renderLoader()
      case states.success:
        return this.renderSuccessView()
      case states.failed:
        return this.renderFailedView()
      default:
        return null
    }
  }
}
export default JobDetails
