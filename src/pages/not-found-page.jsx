import NotFound from "@/components/common/not-found"
import GuestLayout from "@/layouts/guest-layout"
import ProtectedLayout from "@/layouts/protected-layout"
import { getAuthToken } from "@/store/slices/auth-slice"
import { useSelector } from "react-redux"

export default function NotFoundGuestPage() {
  const token = useSelector(getAuthToken)

  if (!token) {
    return (
      <GuestLayout>
        <NotFound />
      </GuestLayout>
    )
  }

  return (
    <ProtectedLayout>
      <NotFound isLogged />
    </ProtectedLayout>
  )
}
