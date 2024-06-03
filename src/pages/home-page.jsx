import TalkInput from "@/components/talk/talk-input"
import TalksList from "@/components/talk/talk-list"
import ProtectedLayout from "@/layouts/protected-layout"
import {
  useCreateTalkMutation,
  useGetAllTalkQuery,
  useToggleLikeTalkMutation,
} from "@/store/api-slices/talk-api-slice"
import { useGetAllUserQuery } from "@/store/api-slices/user-api-slice"
import { getUser } from "@/store/slices/user-slice"
import { useSelector } from "react-redux"

function HomePage() {
  const authUser = useSelector(getUser)
  const { data: talks, isSuccess: isSuccessGetAllTalk } = useGetAllTalkQuery()
  const { data: users, isSuccess: isSuccessGetAllUser } = useGetAllUserQuery()

  const [toggleLikeTalk] = useToggleLikeTalkMutation()
  const [addTalk] = useCreateTalkMutation()

  const onAddTalk = (text) => {
    return addTalk({ text })
  }

  const onLike = (id) => {
    return toggleLikeTalk({ talkId: id })
  }

  const talkList =
    isSuccessGetAllTalk && isSuccessGetAllUser
      ? talks.map((talk) => ({
          ...talk,
          user: users.find((user) => user.id === talk.user),
          authUser: authUser.id,
        }))
      : []

  return (
    <ProtectedLayout>
      <section className="home-page">
        <TalkInput addTalk={onAddTalk} />
        {isSuccessGetAllTalk && isSuccessGetAllUser && (
          <TalksList talks={talkList} like={onLike} />
        )}
      </section>
    </ProtectedLayout>
  )
}

export default HomePage
