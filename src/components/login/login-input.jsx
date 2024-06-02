import useInput from "@/hooks/use-input"
import PropTypes from "prop-types"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function LoginInput({ login, isLoading = false }) {
  const [id, onIdChange] = useInput("")
  const [password, onPasswordChange] = useInput("")

  return (
    <form className="login-input">
      <input
        type="text"
        value={id}
        onChange={onIdChange}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
      />
      <button
        className="flex justify-center items-center"
        disabled={isLoading}
        type="button"
        onClick={() => login({ id, password })}>
        {isLoading && (
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
        )}
        Login
      </button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes?.bool,
}

export default LoginInput
