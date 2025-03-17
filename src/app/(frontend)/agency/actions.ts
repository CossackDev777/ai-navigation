'use server'
import { getPayload, Payload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { headers as getHeaders } from 'next/headers'

export async function signUp(data: any) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { email, password, companyName, name } = data

    const existingUser = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
    })

    if (existingUser.docs.length) throw new Error('ユーザーは既に登録されています!')

    // Create user directly in Payload CMS
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        companyName,
        name,
        role: 'agency',
        status: 'private',
      },
    })

    return { success: true, user: newUser, message: '登録が完了しました！' }
  } catch (error) {
    throw error
  }
}

export async function login(data: { email: string; password: string }) {
  try {
    const payload = await getPayload({ config: configPromise })

    const { email, password } = data

    const existingUser: any = await payload.find({
      collection: 'users',
      where: { email: { equals: email }, role: { equals: 'agency' } },
    })
    if (!existingUser.docs.length) throw new Error('メールまたはパスワードが正しくありません')

    if (existingUser.docs[0]?.status === 'private' || existingUser.docs[0]?.status === 'draft') throw new Error('ユーザーステータスは公開されていません。')

    const user = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    if (!user) throw new Error('メールまたはパスワードが正しくありません')

    if (user?.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', user.token, {
        httpOnly: true,
        path: '/',
      })
    }

    return { success: true, message: 'ユーザーが正常にログインしました', user }
  } catch (error) {
    throw error
  }
}

export async function getUser() {
  try {
    const headers = await getHeaders()
    const payload: Payload = await getPayload({ config: await configPromise })
    const { user } = await payload.auth({ headers })

    return user || null
  } catch (error) {
    throw error
  }
}

export async function getUserAgency() {
  try {
    const headers = await getHeaders()
    const payload: Payload = await getPayload({ config: await configPromise })
    const { user } = await payload.auth({ headers })

    if (!user) throw new Error('User not authenticated')

    const agency = await payload.find({
      collection: 'agency',
      where: { user: { equals: user.id } },
    })

    return agency?.docs?.[0] || null
  } catch (error) {
    throw error
  }
}