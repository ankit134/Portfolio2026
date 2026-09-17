import { createContext } from 'react'
import { getStaticPortfolioData } from '../lib/queries'

export const PortfolioContext = createContext(getStaticPortfolioData())
