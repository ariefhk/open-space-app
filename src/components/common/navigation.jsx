import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const imagePlaceHolder = "https://placehold.co/400"

function Navigation({ authUser, isLoading, signOut }) {
  return (
    <div className="navigation">
      {isLoading ? (
        <img src={imagePlaceHolder} alt={"placeholder"} title={"placeholder"} />
      ) : (
        <img src={authUser.photo} alt={authUser.id} title={authUser.name} />
      )}
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  )
}

const authUserShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string,
}

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  isLoading: PropTypes?.bool,
  signOut: PropTypes.func.isRequired,
}

export default Navigation
