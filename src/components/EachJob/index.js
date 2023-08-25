import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class EachJob extends Component {
  render() {
    const {details} = this.props
    const job = {
      id: details.id,
      location: details.location,
      rating: details.rating,
      title: details.title,
      logo: details.company_logo_url,
      type: details.employment_type,
      description: details.job_description,
      package: details.package_per_annum,
    }
    return (
      <Link to={`/jobs/${job.id}`}>
        <div className="vertical">
          <div className="horizontal">
            <img className="logo" alt="company logo" src={job.logo} />
            <div className="nameAndR">
              <h1 className="color">{job.title}</h1>
              <p className="color">{job.rating}</p>
            </div>
          </div>
          <div className="horizontal">
            <p className="color">{job.location}</p>
            <p className="color">{job.type}</p>
            <p className="color">{job.package}</p>
          </div>
          <hr className="color" />
          <h1 className="color">Description</h1>
          <p className="color">{job.description}</p>
        </div>
      </Link>
    )
  }
}
export default EachJob
