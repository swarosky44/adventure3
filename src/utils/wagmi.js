import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { mainnet, polygon, polygonMumbai, localhost } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ENV, ALCHEMY_PRIVATE_KEY } from './const'

const { chains, provider, webSocketProvider } = configureChains(
  ENV !== 'daily'
    ? [mainnet, polygon, polygonMumbai]
    : [mainnet, polygon, polygonMumbai, localhost],
  [alchemyProvider({ apiKey: ALCHEMY_PRIVATE_KEY })]
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
