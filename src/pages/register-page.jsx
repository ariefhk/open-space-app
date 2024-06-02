import RegisterInput from "@/components/register/register-input"
import { useToast } from "@/components/ui/use-toast"
import { useRegisterMutation } from "@/store/api-slices/auth-api-slice"
import { IoEarthOutline } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"

function RegisterPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [register, { isLoading }] = useRegisterMutation()

  const onRegister = async ({ id, name, password }) => {
    try {
      const user = await register({ id, name, password }).unwrap()
      toast({
        title: "Berhasil Register!",
        description: `Akun ${user?.name} berhasil dibuat!`,
      })
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Gagal Register!",
        description: `Tolong periksa akun Anda`,
      })
    }
  }

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>
          <IoEarthOutline />
        </h1>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} isLoading={isLoading} />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </article>
    </section>
  )
}

export default RegisterPage
