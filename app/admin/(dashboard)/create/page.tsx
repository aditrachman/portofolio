import PostEditor from "../../components/PostEditor"

export default function CreatePost() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">✨ New Post</h1>
      <PostEditor mode="create" />
    </div>
  )
}
