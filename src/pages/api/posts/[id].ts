import { NextApiRequest, NextApiResponse } from "next"
import { posts } from "../../../../data/postsStore"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const post = posts.find((p) => p.id === parseInt(id as string))

  if (!post) {
    return res.status(404).json({ message: "Post not found" })
  }

  if (req.method === "GET") {
    return res.status(200).json(post)
  } else if (req.method === "PATCH") {
    const { title, content } = req.body as { title?: string; content?: string }
    post.title = title ?? post.title
    post.content = content ?? post.content
    return res.status(200).json(post)
  } else if (req.method === "DELETE") {
    const index = posts.indexOf(post)
    posts.splice(index, 1)
    return res.status(204).end()
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
