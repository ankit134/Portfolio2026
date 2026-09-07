import { createContext } from 'react'
import { getStaticPortfolioData } from '../lib/queries'

export const PortfolioContext = createContext(getStaticPortfolioData())

export function PortfolioProvider({ value, children }) {
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
