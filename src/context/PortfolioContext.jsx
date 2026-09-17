import { PortfolioContext } from './portfolio-context'

export function PortfolioProvider({ value, children }) {
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
