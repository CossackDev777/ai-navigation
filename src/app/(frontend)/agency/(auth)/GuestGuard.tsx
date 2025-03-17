'use client'
import { useEffect, useState } from 'react'
import { getUser } from '../actions'
import { useRouter } from 'next/navigation'

const GuestGuard = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<any>(0)

  const handleUser = async () => {
    try {
      const user = await getUser()
      if (user) {
        setUser(1)
        router.push('/agency/my-account')
      } else {
        setUser(2)
      }
    } catch (error) {
      setUser(2)
      router.push('/agency/my-account')
    }
  }

  useEffect(() => {
    handleUser()
  }, [])

  return user === 0 || user === 1 ? (
    <div className="min-h-[calc(100vh-104px)] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-third rounded-full animate-spin"></div>
    </div>
  ) : (
    <>{children}</>
  )
}
export default GuestGuard
