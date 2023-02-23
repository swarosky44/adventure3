export const ALCHEMY_POLYGON_AD3_KEY =
  'https://polygon-mainnet.g.alchemy.com/v2/5aSHl7b-uw8NS_voiPDrdHDp5s7LEJhF'

export const ALCHEMY_MAINNET_AD3_KEY =
  'https://eth-mainnet.g.alchemy.com/v2/dyCEPWX_mo0xyKvBoURmAm4jZHV9dUWf'

export const PRO_API_PREFIX = 'https://www.adventure3.tk'

export const API_PREFIX = location.origin

export const ENV = window.location.origin === 'http://localhost:5173' ? 'test' : 'main'

export const AD3HUB_ADDRESS = ENV === 'test' ? '0x962e21A21BfD80E05c4B92636f91ca956B750FAB' : ''

export const USDT_TOKEN_ADDRESS = ENV === 'test' ? '0xEb3B6d447F0f1bcd47C2Ba907b0b0aE515f67601' : ''

export const USDC_TOKEN_ADDRESS = ENV === 'test' ? '0xEb3B6d447F0f1bcd47C2Ba907b0b0aE515f67601' : ''

export const TASK_TYPE = [
  { key: 'FOLLOW_TWITTER', name: '关注推特' },
  { key: 'RETWEET', name: '转发推特' },
  { key: 'JOIN_DISCORD', name: '加入 Discord' },
  { key: 'JOIN_TELEGRAM', name: '加入 Telegram' },
  { key: 'VISIT_PAGE', name: '浏览网页' }
]
