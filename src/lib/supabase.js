import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/+$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
const isPlaceholderKey = !supabaseAnonKey || supabaseAnonKey === 'your_anon_key_here'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !isPlaceholderKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const STORAGE_BUCKET = 'portfolio-assets'
