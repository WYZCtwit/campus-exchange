import { supabase } from './supabase'

const BUCKET = 'listings-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

interface CompressOptions {
  maxWidth: number
  quality: number
}

/**
 * Compress an image file using the Canvas API.
 * Returns a WebP Blob for optimal size/quality trade-off.
 */
export async function compressImage(
  file: File,
  options: CompressOptions = { maxWidth: 1920, quality: 0.8 },
): Promise<Blob> {
  const bitmap = await createImageBitmap(file)

  const scale = Math.min(1, options.maxWidth / bitmap.width)
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await canvas.convertToBlob({
    type: 'image/webp',
    quality: options.quality,
  })

  return blob
}

/**
 * Upload an image to Supabase Storage and return its public URL.
 *
 * Paths:
 *   - avatar:  {userId}/avatar/{uuid}.webp
 *   - listing: {userId}/{listingType}/{uuid}.webp
 */
export async function uploadImage(
  file: File,
  userId: string,
  target: 'avatar' | 'skill' | 'item' | 'team',
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('不支持的图片格式，请上传 JPG、PNG 或 WebP 图片')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('图片大小不能超过 5MB')
  }

  const compressed = await compressImage(file)

  const path = `${userId}/${target}/${crypto.randomUUID()}.webp`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, compressed, { contentType: 'image/webp' })

  if (error) throw error

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

/**
 * Upload an avatar image specifically.
 * Thin wrapper around uploadImage with avatar defaults.
 */
export async function uploadAvatar(
  file: File,
  userId: string,
): Promise<string> {
  return uploadImage(file, userId, 'avatar')
}
