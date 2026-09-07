import { assetUrl } from './assetUrl'
import { STORAGE_BUCKET, supabase } from './supabase'

export function resolveImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  if (supabase && path.startsWith('storage/')) {
    const storagePath = path.replace(/^storage\//, '')
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath)
    return data.publicUrl
  }

  return assetUrl(path)
}

export async function uploadImage(file, folder = 'uploads') {
  if (!supabase) throw new Error('Supabase is not configured')

  const ext = file.name.split('.').pop()
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw error
  return `storage/${fileName}`
}
