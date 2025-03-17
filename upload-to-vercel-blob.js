// upload-to-vercel-blob.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';

dotenv.config();

// ESモジュールで__dirnameを取得する方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// アップロードするディレクトリのパス
const directoryPath = path.join(__dirname, 'public/media');

// Vercel Blobストレージにアップロードする関数
async function uploadFiles() {
  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileContent = fs.readFileSync(filePath);

      const { url } = await put(file, fileContent, {
        access: 'public', // 必要に応じてアクセス権限を設定
        token: process.env.BLOB_READ_WRITE_TOKEN, // Vercel Blobのアクセストークン      
        addRandomSuffix: false, // ファイル名にランダムな文字列を追加するかどうか  
      });

      console.log(`Uploaded ${file} to ${url}`);
    }
  } catch (error) {
    console.error('Error uploading files:', error);
  }
}

uploadFiles();
