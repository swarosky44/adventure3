import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, polygonMumbai],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Adventure3',
  chains
})

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

export { chains }
