'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '@/lib/blog'

interface AdminPostFormProps {
  post?: BlogPost | null
  onSave: (post: BlogPost) => void
  onCancel: () => void
}

export default function AdminPostForm({ post, onSave, onCancel }: AdminPostFormProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    image: '/favicon.webp',
    date: new Date().toISOString().split('T')[0],
    category: 'Social Media',
    author: 'Algo Digital Solutions',
    tags: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    },
    published: false,
    featured: false,
    id: 0,
  })

  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    if (post) {
      setFormData(post)
      setTagsInput(post.tags.join(', '))
    } else {
      // Generate slug from title
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }

      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.title || ''),
      }))
    }
  }, [post])

  useEffect(() => {
    if (!post) {
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }

      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.title || ''),
        seo: {
          metaTitle: prev.title || '',
          metaDescription: prev.excerpt || '',
          keywords: prev.tags?.join(', ') || '',
        },
      }))
    }
  }, [formData.title, formData.excerpt, post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const postData: BlogPost = {
      ...formData,
      tags,
      id: post?.id || Date.now(),
    } as BlogPost

    onSave(postData)
  }

  return (
    <div className="admin-post-form">
      <div className="admin-post-form-header">
        <h2>{post ? 'Editează Articol' : 'Articol Nou'}</h2>
        <button onClick={onCancel} className="btn btn-outline-secondary btn-sm">
          Anulează
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-post-form-content">
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="title">Titlu *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="slug">Slug *</label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="admin-form-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label htmlFor="excerpt">Rezumat *</label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={3}
            className="admin-form-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="content">Conținut HTML *</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={15}
            className="admin-form-textarea admin-form-textarea-code"
            placeholder="<html>...</html>"
          />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="category">Categorie *</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="date">Data *</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="admin-form-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="image">Imagine</label>
            <input
              type="text"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="admin-form-input"
              placeholder="/favicon.webp"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label htmlFor="tags">Tag-uri (separate prin virgulă)</label>
          <input
            type="text"
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="admin-form-input"
            placeholder="web design, Brașov, marketing digital"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="seo-meta-title">SEO Meta Title</label>
          <input
            type="text"
            id="seo-meta-title"
            value={formData.seo?.metaTitle || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                seo: { ...formData.seo!, metaTitle: e.target.value },
              })
            }
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="seo-meta-description">SEO Meta Description</label>
          <textarea
            id="seo-meta-description"
            value={formData.seo?.metaDescription || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                seo: { ...formData.seo!, metaDescription: e.target.value },
              })
            }
            rows={2}
            className="admin-form-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="seo-keywords">SEO Keywords</label>
          <input
            type="text"
            id="seo-keywords"
            value={formData.seo?.keywords || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                seo: { ...formData.seo!, keywords: e.target.value },
              })
            }
            className="admin-form-input"
            placeholder="web design, Brașov, marketing online"
          />
        </div>

        <div className="admin-form-checkboxes">
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <span>Publicat</span>
          </label>

          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <span>Featured</span>
          </label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-accent">
            {post ? 'Salvează Modificările' : 'Creează Articol'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-outline-secondary">
            Anulează
          </button>
        </div>
      </form>

      <style jsx>{`
        .admin-post-form {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
        }

        .admin-post-form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .admin-post-form-header h2 {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .admin-post-form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .admin-form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .admin-form-group label {
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .admin-form-input,
        .admin-form-textarea {
          padding: 0.75rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .admin-form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .admin-form-textarea-code {
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        .admin-form-input:focus,
        .admin-form-textarea:focus {
          outline: none;
          border-color: #2E5E99;
          background: rgba(255, 255, 255, 0.15);
        }

        .admin-form-input::placeholder,
        .admin-form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .admin-form-checkboxes {
          display: flex;
          gap: 2rem;
        }

        .admin-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #ffffff;
        }

        .admin-checkbox-label input[type='checkbox'] {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
        }

        .admin-form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .admin-form-row {
            grid-template-columns: 1fr;
          }

          .admin-form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

