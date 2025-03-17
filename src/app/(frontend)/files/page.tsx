import NavigateToSignedUrl from '@/components/NavigateToSignedUrl/NavigateToSignedUrl'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NavigateToSignedUrl />
    </Suspense>
  )
}
