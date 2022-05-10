import { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import Link from 'next/link'

import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Postagens relacionadas' : 'Postagens recentes'}
      </h3>
      {relatedPosts.map((post) => (
        <div className="mb-4 flex w-full items-center" key={post.title}>
          <div className="w-16 flex-none">
            <img
              className="rounded-full align-middle"
              src={post.featuredImage.url}
              alt={post.title}
              height="60px"
              width="60px"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xl text-gray-500">
              {moment(post.createdAt).format('LLL')}
            </p>
            <Link className="text-md" href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
