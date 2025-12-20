'use client'

import { useState, useEffect } from 'react'
import { BlogPost, getAllPosts } from '@/lib/blog'
import AdminPostList from './AdminPostList'
import AdminPostForm from './AdminPostForm'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      // In a real app, this would fetch from an API
      // For now, we'll use a client-side approach
      const response = await fetch('/api/admin/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        // Fallback: try to get from getAllPosts (but this won't work client-side)
        // We'll need an API route for this
        console.error('Failed to load posts')
      }
    } catch (error) {
      console.error('Error loading posts:', error)
      // For now, we'll show empty state
      setPosts([])
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleDelete = async (slug: string) => {
    try {
      const updatedPosts = posts.filter((p) => p.slug !== slug)
      await savePosts(updatedPosts)
      setPosts(updatedPosts)
      showMessage('success', 'Articol șters cu succes!')
    } catch (error) {
      showMessage('error', 'Eroare la ștergerea articolului')
    }
  }

  const handleSave = async (postData: BlogPost) => {
    try {
      setLoading(true)
      let updatedPosts: BlogPost[]

      if (editingPost) {
        // Update existing post
        updatedPosts = posts.map((p) => (p.slug === editingPost.slug ? postData : p))
      } else {
        // Add new post
        updatedPosts = [...posts, postData]
      }

      await savePosts(updatedPosts)
      setPosts(updatedPosts)
      setEditingPost(null)
      setShowForm(false)
      showMessage('success', editingPost ? 'Articol actualizat!' : 'Articol creat!')
    } catch (error) {
      showMessage('error', 'Eroare la salvare')
    } finally {
      setLoading(false)
    }
  }

  const handlePublishToGitHub = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const githubToken = prompt('Introdu token-ul GitHub:')
      if (!githubToken) {
        showMessage('error', 'Token GitHub necesar')
        return
      }

      const response = await fetch('/api/github-commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          githubToken,
          posts: posts,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        showMessage('success', 'Articole publicate pe GitHub cu succes!')
      } else {
        showMessage('error', result.error || 'Eroare la publicare')
      }
    } catch (error) {
      showMessage('error', 'Eroare la conectarea la GitHub')
    } finally {
      setLoading(false)
    }
  }

  const handleIndexToGoogle = async (slug: string) => {
    try {
      setLoading(true)
      const url = `https://adsnow.ro/blog/${slug}`

      const response = await fetch('/api/google-indexing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const result = await response.json()

      if (response.ok) {
        showMessage('success', `Articol indexat în Google: ${slug}`)
      } else {
        showMessage('error', result.error || 'Eroare la indexare')
      }
    } catch (error) {
      showMessage('error', 'Eroare la conectarea la Google')
    } finally {
      setLoading(false)
    }
  }

  const handleIndexAllToGoogle = async () => {
    if (!confirm('Vrei să indexezi toate articolele publicate în Google?')) {
      return
    }

    try {
      setLoading(true)
      const publishedPosts = posts.filter((p) => p.published)
      
      for (const post of publishedPosts) {
        const url = `https://adsnow.ro/blog/${post.slug}`
        await fetch('/api/google-indexing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })
        // Wait 1 second between requests to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      showMessage('success', `Toate articolele (${publishedPosts.length}) au fost trimise pentru indexare`)
    } catch (error) {
      showMessage('error', 'Eroare la indexarea articolelor')
    } finally {
      setLoading(false)
    }
  }

  const savePosts = async (updatedPosts: BlogPost[]) => {
    // This will be handled by the API route
    const response = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posts: updatedPosts }),
    })

    if (!response.ok) {
      throw new Error('Failed to save posts')
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-dashboard-actions">
          <button
            onClick={() => {
              setEditingPost(null)
              setShowForm(true)
            }}
            className="btn btn-accent"
          >
            + Articol Nou
          </button>
          <button
            onClick={handlePublishToGitHub}
            className="btn btn-outline-primary"
            disabled={loading || posts.length === 0}
          >
            {loading ? 'Se publică...' : 'Publică pe GitHub'}
          </button>
          <button
            onClick={handleIndexAllToGoogle}
            className="btn btn-outline-secondary"
            disabled={loading || posts.filter((p) => p.published).length === 0}
          >
            {loading ? 'Se indexează...' : 'Indexează în Google'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`admin-message admin-message-${message.type}`}>
          {message.text}
        </div>
      )}

      {showForm ? (
        <AdminPostForm
          post={editingPost}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingPost(null)
          }}
        />
      ) : (
        <AdminPostList
          posts={posts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onIndexToGoogle={handleIndexToGoogle}
        />
      )}

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--bg-color, #0D2440);
          padding: 2rem;
        }

        .admin-dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .admin-dashboard-header h1 {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
        }

        .admin-dashboard-actions {
          display: flex;
          gap: 1rem;
        }

        .admin-message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .admin-message-success {
          background: rgba(76, 175, 80, 0.2);
          border: 1px solid #4CAF50;
          color: #4CAF50;
        }

        .admin-message-error {
          background: rgba(239, 83, 80, 0.2);
          border: 1px solid #EF5350;
          color: #EF5350;
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }

          .admin-dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .admin-dashboard-actions {
            width: 100%;
            flex-direction: column;
          }

          .admin-dashboard-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

