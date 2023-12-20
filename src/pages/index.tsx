import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Inter } from "next/font/google"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Story } from "../../types"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const page = parseInt(router.query.page as string) || 1

  useEffect(() => {
    fetchStories(page)
  }, [page])

  const fetchStories = async (pageNum: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://cryptodire.kontinentalist.com/api/v1/stories?page=${pageNum}`
      )
      const data = await response.json()
      if (data.data.length === 0) {
        setHasMore(false)
      } else {
        setStories(pageNum === 1 ? data.data : (prev) => [...prev, ...data.data])
      }
    } catch (error) {
      console.error("Error fetching stories:", error)
    }
    setIsLoading(false)
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    router.push(`/?page=${nextPage}`, undefined, { shallow: true })
  }

  const formatPublishedDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, "MMMM dd, yyyy")
  }

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="w-full bg-gray-300 rounded-t-lg h-56"></div> {/* Image skeleton */}
      <div className="p-4">
        <div className="h-8 bg-gray-300 rounded mb-4"></div> {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-2"></div> {/* Subtitle skeleton */}
        <div className="h-4 bg-gray-300 rounded"></div> {/* Content skeleton */}
      </div>
    </div>
  )
  return (
    <main className={`flex flex-col items-center justify-between p-10 md:p-24 ${inter.className}`}>
      <div className="flex flex-row gap-1 justify-center align-middle items-center mt-10 sm:mt-0">
        Built by{" "}
        <a
          href="https://twitter.com/jakekovoor"
          target="_blank"
          className="flex justify-center bg-white font-bold p-2 rounded-2xl items-center gap-1 "
        >
          <Image
            src="https://pbs.twimg.com/profile_images/1706935000703315968/r6aQH0jg_400x400.jpg"
            width={40}
            className="object-cover rounded-full"
            height={10}
            alt="Picture of Jake"
          />
          @jakekovoor
        </a>
      </div>
      <div className="p-4 w-full max-w-full md:max-w-xl justify-center">
        <main className="space-y-8 max-w-full w-full">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full shadow-xl rounded-lg overflow-hidden">
                  <SkeletonLoader />
                </div>
              ))
            : stories.map((story) => (
                <Card key={story.id} className="w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    alt={story.title}
                    src={story.hero_image.url}
                    className="object-cover"
                    layout="responsive"
                    height={9}
                    width={16}
                  />
                  <CardContent className="p-4">
                    <CardTitle className="font-bold text-lg">{story.title}</CardTitle>
                    <div className="text-sm text-gray-500 my-2">
                      {/* Display the author's name */}
                      By {story.authors[0].name} • {formatPublishedDate(story.published_at)}{" "}
                      {/* Assuming read time is not available */}
                    </div>
                    <p
                      className="text-sm text-gray-800 mt-2"
                      dangerouslySetInnerHTML={{ __html: story.dek }}
                    ></p>
                  </CardContent>
                </Card>
              ))}
        </main>

        <Button
          variant="outline"
          className="bg-blue-500 text-white text-lg p-6 hover:bg-blue-400 hover:text-white mt-10 w-full self-center "
          onClick={handleLoadMore}
          disabled={isLoading || !hasMore}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </main>
  )
}
