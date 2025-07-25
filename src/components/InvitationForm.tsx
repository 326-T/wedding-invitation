'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  attendance: 'attending' | 'not_attending' | ''
  guest_count: number
  dietary_restrictions: string
  message: string
}

export default function InvitationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attendance: '',
    guest_count: 1,
    dietary_restrictions: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          attendance: '',
          guest_count: 1,
          dietary_restrictions: '',
          message: '',
        })
      } else {
        alert('送信に失敗しました。もう一度お試しください。')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">送信完了</h2>
          <p className="text-gray-600">
            ご回答ありがとうございます。<br />
            お返事をお待ちしております。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        結婚式への招待状
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            お名前 *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            出席の可否 *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="attendance"
                value="attending"
                checked={formData.attendance === 'attending'}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value as 'attending' })}
                className="mr-2"
              />
              出席します
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="attendance"
                value="not_attending"
                checked={formData.attendance === 'not_attending'}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value as 'not_attending' })}
                className="mr-2"
              />
              欠席します
            </label>
          </div>
        </div>

        {formData.attendance === 'attending' && (
          <>
            <div>
              <label htmlFor="guest_count" className="block text-sm font-medium text-gray-700 mb-1">
                参加人数
              </label>
              <select
                id="guest_count"
                value={formData.guest_count}
                onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}名
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dietary_restrictions" className="block text-sm font-medium text-gray-700 mb-1">
                食物アレルギー・食事制限
              </label>
              <textarea
                id="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={(e) => setFormData({ ...formData, dietary_restrictions: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="特にない場合は空欄で構いません"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            メッセージ
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="お祝いのメッセージをお聞かせください"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email || !formData.attendance}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </form>
    </div>
  )
}