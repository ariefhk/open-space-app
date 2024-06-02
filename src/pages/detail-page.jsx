import TalkDetail from "@/components/talk/talk-detail"
import TalkItem from "@/components/talk/talk-item"
import TalkReplyInput from "@/components/talk/talk-reply-input"
import ProtectedLayout from "@/layouts/protected-layout"
import {
  useCreateTalkMutation,
  useGetTalkDetailQuery,
  useToggleLikeTalkMutation,
} from "@/store/api-slices/talk-api-slice"
import { getUser } from "@/store/slices/user-slice"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function DetailPage() {
  const { id } = useParams()
  const { data: talkDetail, isSuccess: isSuccessGetTalkDetail } =
    useGetTalkDetailQuery({ id })
  const [addTalk] = useCreateTalkMutation()
  const [toggleLikeTalk] = useToggleLikeTalkMutation()
  const authUser = useSelector(getUser)

  const onLikeTalk = () => {
    return toggleLikeTalk({ talkId: id })
  }

  const onReplyTalk = (text) => {
    return addTalk({ text, replyTo: id })
  }

  if (!talkDetail && isSuccessGetTalkDetail) {
    return null
  }

  return (
    <ProtectedLayout>
      <section className="detail-page">
        {isSuccessGetTalkDetail && talkDetail.parent && (
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <TalkItem {...talkDetail.parent} authUser={authUser.id} />
          </div>
        )}
        {isSuccessGetTalkDetail && (
          <TalkDetail
            {...talkDetail}
            authUser={authUser.id}
            likeTalk={onLikeTalk}
          />
        )}
        <TalkReplyInput replyTalk={onReplyTalk} />
      </section>
    </ProtectedLayout>
  )
}

export default DetailPage
