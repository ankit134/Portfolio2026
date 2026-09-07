import {
  profile as staticProfile,
  projects as staticProjects,
  experience as staticExperience,
  skillTags as staticSkillTags,
  socialLinks as staticSocialLinks,
  footerSocialIcons,
} from '../data/content'
import {
  mapExperience,
  mapProject,
  mapSiteSettings,
  mapSocialLink,
} from './mappers'
import { supabase, isSupabaseConfigured } from './supabase'

export function getStaticPortfolioData() {
  return {
    profile: staticProfile,
    projects: staticProjects,
    experience: staticExperience,
    skillTags: staticSkillTags,
    socialLinks: staticSocialLinks,
    footerSocialIcons,
    source: 'static',
  }
}

export async function fetchPortfolioData() {
  if (!isSupabaseConfigured || !supabase) {
    return getStaticPortfolioData()
  }

  try {
    const [settingsRes, skillsRes, projectsRes, experienceRes, socialRes] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('skills').select('*').order('sort_order'),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('experience').select('*').order('sort_order'),
      supabase.from('social_links').select('*').order('sort_order'),
    ])

    const firstError =
      settingsRes.error ??
      skillsRes.error ??
      projectsRes.error ??
      experienceRes.error ??
      socialRes.error

    if (firstError) {
      console.error('[portfolio] Supabase fetch failed:', firstError.message, firstError)
      return { ...getStaticPortfolioData(), loadError: firstError.message }
    }

    const profile = mapSiteSettings(settingsRes.data)
    const projects = (projectsRes.data ?? []).map(mapProject)
    const experience = (experienceRes.data ?? []).map(mapExperience)
    const skillTags = (skillsRes.data ?? []).map((s) => s.label)
    const socialLinks = (socialRes.data ?? []).map(mapSocialLink)

    if (!profile || projects.length === 0) {
      return { ...getStaticPortfolioData(), loadError: 'No portfolio rows found in Supabase. Run seed.sql.' }
    }

    return {
      profile,
      projects,
      experience,
      skillTags,
      socialLinks,
      footerSocialIcons: socialLinks.map((l) => l.icon).filter(Boolean),
      source: 'supabase',
    }
  } catch (err) {
    console.error('[portfolio] Supabase fetch failed:', err)
    return { ...getStaticPortfolioData(), loadError: err.message ?? 'Unknown error' }
  }
}

export async function fetchProjectBySlug(slug) {
  if (!isSupabaseConfigured || !supabase) {
    const project = staticProjects.find((p) => p.id === slug)
    return project ?? null
  }

  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  if (!data) return null
  return mapProject(data)
}

export async function submitContactMessage({ name, email, message }) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Contact form requires Supabase. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const { error } = await supabase.from('contact_messages').insert({ name, email, message })
  if (error) throw error
}

export async function fetchContactMessages() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function markMessageRead(id, isRead = true) {
  if (!supabase) return
  const { error } = await supabase.from('contact_messages').update({ is_read: isRead }).eq('id', id)
  if (error) throw error
}

export async function updateSiteSettings(updates) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('site_settings').update(updates).eq('id', 1)
  if (error) throw error
}

export async function upsertProject(row, dbId) {
  if (!supabase) throw new Error('Supabase not configured')
  if (dbId) {
    const { error } = await supabase.from('projects').update(row).eq('id', dbId)
    if (error) throw error
    return
  }
  const { error } = await supabase.from('projects').insert(row)
  if (error) throw error
}

export async function deleteProject(dbId) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('projects').delete().eq('id', dbId)
  if (error) throw error
}

export async function upsertExperience(row, dbId) {
  if (!supabase) throw new Error('Supabase not configured')
  if (dbId) {
    const { error } = await supabase.from('experience').update(row).eq('id', dbId)
    if (error) throw error
    return
  }
  const { error } = await supabase.from('experience').insert(row)
  if (error) throw error
}

export async function deleteExperience(dbId) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('experience').delete().eq('id', dbId)
  if (error) throw error
}

export async function upsertSkill(label, sortOrder, dbId) {
  if (!supabase) throw new Error('Supabase not configured')
  if (dbId) {
    const { error } = await supabase.from('skills').update({ label, sort_order: sortOrder }).eq('id', dbId)
    if (error) throw error
    return
  }
  const { error } = await supabase.from('skills').insert({ label, sort_order: sortOrder })
  if (error) throw error
}

export async function deleteSkill(dbId) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('skills').delete().eq('id', dbId)
  if (error) throw error
}

export async function fetchSkillsRaw() {
  if (!supabase) return []
  const { data, error } = await supabase.from('skills').select('*').order('sort_order')
  if (error) throw error
  return data ?? []
}

export async function fetchProjectsRaw() {
  if (!supabase) return []
  const { data, error } = await supabase.from('projects').select('*').order('sort_order')
  if (error) throw error
  return data ?? []
}

export async function fetchExperienceRaw() {
  if (!supabase) return []
  const { data, error } = await supabase.from('experience').select('*').order('sort_order')
  if (error) throw error
  return data ?? []
}

export async function fetchSiteSettingsRaw() {
  if (!supabase) return null
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return data
}
