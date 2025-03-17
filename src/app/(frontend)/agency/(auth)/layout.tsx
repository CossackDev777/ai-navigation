import { FC, ReactNode } from 'react'
import GuestGuard from './GuestGuard'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <GuestGuard>{children}</GuestGuard>
    </>
  )
}

export default Layout
