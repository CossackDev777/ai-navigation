import { NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'
import os from 'os'

function base64ToJson(base64String: string): object | null {
  try {
    // Decode Base64 to string
    const decodedString = atob(base64String)
    // Parse string to JSON
    return JSON.parse(decodedString)
  } catch (error) {
    console.error('Error decoding Base64 to JSON:', error)
    return null
  }
}

// Example usage
const base64String = process.env.GCLOUD_KEYFILE as string
const keyfile = base64ToJson(base64String) as object

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: keyfile,
})
const bucketName = process.env.GCLOUD_BUCKET

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const destFileName = `${uuidv4()}-${file.name}`
    const tempFilePath = path.join(os.tmpdir(), destFileName)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(tempFilePath, buffer)

    // Upload file to GCS
    await storage.bucket(bucketName).upload(tempFilePath, {
      destination: destFileName,
    })

    return NextResponse.json({ destFileName })
  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const destFileName = searchParams.get('destFileName')
    if (!destFileName) {
      return NextResponse.json({ error: 'Missing destFileName parameter' }, { status: 400 })
    }

    // Generate a signed URL
    const [signedUrl] = await storage
      .bucket(bucketName)
      .file(destFileName)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes expiration
      })

    return NextResponse.json({ signedUrl })
  } catch (error) {
    console.error('Get Signed URL Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
