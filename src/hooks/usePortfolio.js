import { useContext } from 'react'
import { PortfolioContext } from '../context/portfolio-context'

export function usePortfolio() {
  return useContext(PortfolioContext)
}
