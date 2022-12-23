import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chains, client } from '@/utils/wagmi'
import routes from '@/routes'
import '@/styles/global.less'
import '@rainbow-me/rainbowkit/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={routes} />
      </RainbowKitProvider>
    </WagmiConfig>
)
