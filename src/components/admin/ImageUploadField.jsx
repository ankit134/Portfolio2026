import { useRef, useState } from 'react'
import { resolveImageUrl, uploadImage } from '../../lib/imageUrl'

const labelClass = 'mb-1.5 block text-sm font-medium text-[#c4c4cc]'
const hintClass = 'mt-1.5 text-xs leading-relaxed text-[#8A8A93]'

export default function ImageUploadField({
  label,
  hint,
  value = '',
  onChange,
  folder = 'projects',
  onStatus,
}) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file) {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const path = await uploadImage(file, folder)
      onChange(path)
      onStatus?.('Image uploaded successfully.')
    } catch (err) {
      const message = err.message || 'Upload failed.'
      setError(message)
      onStatus?.(message)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const previewUrl = value ? resolveImageUrl(value) : ''

  return (
    <div>
      {label ? <p className={labelClass}>{label}</p> : null}

      {previewUrl ? (
        <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-[#111113]">
          <img
            src={previewUrl}
            alt=""
            className="max-h-48 w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="mt-2 flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#111113] px-4 text-sm text-[#8A8A93]">
          No image yet — use the button below to upload.
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-[#FF5733] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : previewUrl ? 'Replace image' : 'Upload image'}
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-sm font-medium text-[#8A8A93] transition-colors hover:text-white"
          >
            Remove
          </button>
        ) : null}
      </div>

      {hint ? <p className={hintClass}>{hint}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
