import type { AccessArgs } from 'payload'
// import type { ClientUser } from 'payload'
import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAdmin = ({ req: { user } }: AccessArgs<User>) => {
  return user?.role === 'admin';
}
export const isEditor = ({ req: { user } }: AccessArgs<User>) => {
  return user?.role === 'editor';
}
export const isCustomer = ({ req: { user } }: AccessArgs<User>) => {
  return user?.role === 'customer';
}
export const isAdminOrEditor = ({ req: { user } }: AccessArgs<User>) => {
  return user?.role === 'admin' || user?.role === 'editor';
}
export const isAdminAccess = ({ req: { user } }: AccessArgs<User>) => {
  return user?.role === 'admin' || user?.role === 'editor';
}

export const isAdminOrSelf = ({ req }: { req: any }) => {
  const user = req.user
  if (!user) return false
  if (user.role === 'admin') {
    return true
  }
  return {
    id: {
      equals: user.id,
    },
  }
}

// export const isHiddenForNonAdmin = ({ user }: { user: ClientUser }) => {
//   return user?.role !== 'admin';
// }
