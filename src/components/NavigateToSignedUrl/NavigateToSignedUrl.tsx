'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NavigateToSignedUrl() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [destFileName, setDestFileName] = useState<string | null>(null)

  useEffect(() => {
    setDestFileName(searchParams.get('destFileName'))
  }, [searchParams])

  useEffect(() => {
    if (destFileName) {
      fetch(`/api/files?destFileName=${encodeURIComponent(destFileName)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.signedUrl) {
            window.location.href = data.signedUrl
          } else {
            console.error('Error fetching signed URL', data)
          }
        })
        .catch((err) => console.error('Request failed', err))
    }
  }, [destFileName])

  return <p>Redirecting...</p>
}
