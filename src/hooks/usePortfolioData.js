import { useQuery } from '@tanstack/react-query'
import { fetchPortfolioData, fetchProjectBySlug } from '../lib/queries'

export function usePortfolioData() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5,
  })
}

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: Boolean(slug),
  })
}
