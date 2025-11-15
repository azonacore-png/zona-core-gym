import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
  url: string | null
  size: number
  onUpload: (url: string) => void
}

export default function UploadAvatar({ url, size, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Selecciona una imagen')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Subimos archivo
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obtenemos URL pública
      const { data: publicData } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const publicURL = publicData.publicUrl
      onUpload(publicURL)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="text-center">
      {url ? (
        <img
          src={url}
          alt="Avatar"
          className={`rounded-full border-4 border-white shadow-lg object-cover mx-auto`}
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className={`rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold shadow-lg mx-auto`}
          style={{ width: size, height: size }}
        >
          {uploading ? '...' : '👤'}
        </div>
      )}

      <label className="cursor-pointer mt-4 inline-block">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
        <span className="bg-[#FF7A3C] hover:bg-[#e66a2b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          {uploading ? 'Subiendo...' : 'Cambiar foto'}
        </span>
      </label>
    </div>
  )
}
