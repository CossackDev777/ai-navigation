import { FC, ReactNode } from 'react'
import AuthGuard from './AuthGuard'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  )
}

export default Layout
