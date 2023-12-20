//Post type
export interface Post {
  id: number
  title: string
  content: string
}

//Story type
export interface Story {
  id: number
  title: string
  dek: string
  hero_image: {
    url: string
  }
  tags: string[]
  published_at: string
  authors: {
    name: string
  }[]
}
