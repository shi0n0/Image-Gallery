'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>何かが間違っています！</h2>
      <button
        onClick={
          () => reset()
        }
      >
        リトライ
      </button>
    </div>
  )
}