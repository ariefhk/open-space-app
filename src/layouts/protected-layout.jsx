import Navigation from "@/components/common/navigation"
import { useGetProfileQuery } from "@/store/api-slices/user-api-slice"
import { clearToken } from "@/store/slices/auth-slice"
import { clearUser, getUser, setUser } from "@/store/slices/user-slice"
import PropTypes from "prop-types"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function ProtectedLayout({ children }) {
  const { data: authUser, isSuccess } = useGetProfileQuery()
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          id: authUser?.id,
          name: authUser?.name,
          photo: authUser?.photo,
        }),
      )
    }
  }, [dispatch, isSuccess, authUser?.id, authUser?.name, authUser?.photo])

  const signOut = useCallback(() => {
    dispatch(clearToken())
    dispatch(clearUser())
  }, [dispatch])

  return (
    <div className="app-container">
      <header>
        <Navigation authUser={user} signOut={signOut} />
      </header>
      <main>{children}</main>
    </div>
  )
}

ProtectedLayout.propTypes = {
  children: PropTypes.node,
}
