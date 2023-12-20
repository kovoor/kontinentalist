import { NextApiRequest, NextApiResponse } from "next"
import { posts } from "../../../../data/postsStore"
import { Post } from "../../../../types"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(posts)
  } else if (req.method === "POST") {
    const { title, content } = req.body as { title: string; content: string }
    const newPost: Post = { id: posts.length + 1, title, content }
    posts.push(newPost)
    return res.status(201).json(newPost)
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
