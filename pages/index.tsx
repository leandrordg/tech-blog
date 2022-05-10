import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, Categories, PostWidget, Footer } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections'
import { Key } from 'react'

const Home: NextPage = ({ posts }) => {
  return (
    <div className="container mx-auto px-10">
      <Head>
        <title>TECH BLOG - SUA REDE DE NOTICIAS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedPosts />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: { node: any }, index: Key | null | undefined) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget categories={undefined} slug={undefined} />
            <Categories />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}

export default Home
