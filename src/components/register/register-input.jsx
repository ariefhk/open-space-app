import useInput from "@/hooks/use-input"
import PropTypes from "prop-types"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function RegisterInput({ register, isLoading = false }) {
  const [name, onNameChange] = useInput("")
  const [id, onIdChange] = useInput("")
  const [password, onPasswordChange] = useInput("")

  return (
    <form className="register-input">
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
      />
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
        onClick={() => register({ name, id, password })}>
        {isLoading && (
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
        )}
        Register
      </button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  isLoading: PropTypes?.bool,
}

export default RegisterInput
