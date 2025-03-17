import { getClientSideURL } from '@/utilities/getURL'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value || null
  const meReq = await fetch(`${getClientSideURL()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
  const user = await meReq.json()
  if (user) {
    const role = user?.user?.role
    return Response.json({ token, role })
  }
  return Response.json({ token: null, role: null })
}
