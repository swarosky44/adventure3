import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { chains, client } from '@/utils/wagmi'
import routes from '@/routes'
import '@/styles/global.less'
import '@rainbow-me/rainbowkit/styles.css'

const index = Math.floor(Math.random() * (100 - 1)) + 1
const CustomAvatar = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
  ) : (
    <div
      style={{
        backgroundColor: 'pink',
        borderRadius: 999,
        height: size,
        width: size
      }}
      onClick={() => window.location.assign('https://ad3.app/profile')}
    >
      <img
        style={{ width: '100%' }}
        src={`https://db35z3hw6fbxp.cloudfront.net/user-icon${index}.png`}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <RainbowKitProvider chains={chains} avatar={CustomAvatar}>
      <RouterProvider router={routes} />
    </RainbowKitProvider>
  </WagmiConfig>
)
