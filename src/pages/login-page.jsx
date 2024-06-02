import LoginInput from "@/components/login/login-input"
import { useToast } from "@/components/ui/use-toast"
import { useLoginMutation } from "@/store/api-slices/auth-api-slice"
import { setToken } from "@/store/slices/auth-slice"
import { IoEarthOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const dispatch = useDispatch()

  const onLogin = async ({ id, password }) => {
    try {
      const userToken = await login({ id, password }).unwrap()
      dispatch(setToken(userToken))
      toast({
        title: "Berhasil Login!",
        description: `Selamat, Anda berhasil login`,
      })
      navigate("/")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal Login!",
        description: `Tolong periksa akun Anda`,
      })
    }
  }

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>
          <IoEarthOutline />
        </h1>
      </header>
      <article className="login-page__main">
        <h2>
          See <strong>The World</strong>, <br />
          Through Open Space.
        </h2>

        <LoginInput login={onLogin} isLoading={isLoading} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  )
}

export default LoginPage
