const Skill = props => {
  const {details} = props

  return (
    <div>
      <img alt={details.name} src={details.image_url} />
      <p>{details.name}</p>
    </div>
  )
}
export default Skill
