import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

export function usePortfolio() {
  return useContext(PortfolioContext)
}
