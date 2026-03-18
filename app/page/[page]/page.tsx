import { notFound } from 'next/navigation'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from '../../Main'

const POSTS_PER_PAGE = 6

export async function generateStaticParams() {
  const total = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  return Array.from({ length: total }, (_, i) => ({ page: String(i + 1) }))
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageParam } = await params
  const page = parseInt(pageParam)
  const posts = allCoreContent(sortPosts(allBlogs))
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (isNaN(page) || page < 1 || page > totalPages) {
    notFound()
  }

  return <Main posts={posts} currentPage={page} />
}
