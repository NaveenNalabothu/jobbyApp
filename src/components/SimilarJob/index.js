const SimilarJob = props => {
  const {details} = props
  console.log(details)
  return (
    <div>
      <img alt="similar job company logo" src={details.company_logo_url} />
      <h1>{details.title}</h1>
      <p>{details.rating}</p>
      <h1>Description</h1>
      <p>{details.job_description}</p>
      <p>{details.location}</p>
      <p>{details.employment_type}</p>
    </div>
  )
}
export default SimilarJob
