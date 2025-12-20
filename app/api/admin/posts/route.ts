import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { BlogPost } from '@/lib/blog'

const postsFilePath = path.join(process.cwd(), 'content', 'posts.json')

// GET - Read all posts
export async function GET() {
  try {
    const fileContents = fs.readFileSync(postsFilePath, 'utf8')
    const posts: BlogPost[] = JSON.parse(fileContents)
    
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error('Error reading posts:', error)
    return NextResponse.json(
      { error: 'Failed to read posts' },
      { status: 500 }
    )
  }
}

// POST - Save posts (for admin updates)
export async function POST(request: NextRequest) {
  try {
    // In production, add authentication check here
    // const authHeader = request.headers.get('authorization')
    // if (!isAuthenticated(authHeader)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { posts } = body

    if (!Array.isArray(posts)) {
      return NextResponse.json(
        { error: 'Invalid posts data' },
        { status: 400 }
      )
    }

    // Validate posts structure
    const validPosts = posts.filter((post: any) => {
      return (
        post.slug &&
        post.title &&
        post.excerpt &&
        post.content &&
        post.date &&
        post.category &&
        post.author &&
        Array.isArray(post.tags) &&
        post.seo &&
        typeof post.published === 'boolean' &&
        typeof post.featured === 'boolean'
      )
    })

    // Write to file
    fs.writeFileSync(
      postsFilePath,
      JSON.stringify(validPosts, null, 2),
      'utf8'
    )

    return NextResponse.json(
      { success: true, count: validPosts.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving posts:', error)
    return NextResponse.json(
      { error: 'Failed to save posts' },
      { status: 500 }
    )
  }
}

