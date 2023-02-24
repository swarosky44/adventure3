export const ALCHEMY_POLYGON_AD3_KEY =
  'https://polygon-mainnet.g.alchemy.com/v2/5aSHl7b-uw8NS_voiPDrdHDp5s7LEJhF'

export const ALCHEMY_MAINNET_AD3_KEY =
  'https://eth-mainnet.g.alchemy.com/v2/dyCEPWX_mo0xyKvBoURmAm4jZHV9dUWf'

export const PRO_API_PREFIX = 'https://www.adventure3.tk'

export const API_PREFIX = location.origin

export const ENV =
  window.location.search.indexOf('env=test') >= 0
    ? 'test'
    : window.location.search.indexOf('env=daily') >= 0
    ? 'daily'
    : 'prod'

export const AD3HUB_ADDRESS =
  ENV === 'test'
    ? '0x962e21A21BfD80E05c4B92636f91ca956B750FAB'
    : ENV === 'daily'
    ? '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    : ''

export const USDT_TOKEN_ADDRESS =
  ENV === 'test'
    ? '0xEb3B6d447F0f1bcd47C2Ba907b0b0aE515f67601'
    : ENV === 'daily'
    ? '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    : ''

export const USDC_TOKEN_ADDRESS =
  ENV === 'test'
    ? '0xEb3B6d447F0f1bcd47C2Ba907b0b0aE515f67601'
    : ENV === 'daily'
    ? '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    : ''

export const TASK_TYPE = [
  { key: 'FOLLOW_TWITTER', name: '关注推特' },
  { key: 'RETWEET', name: '转发推特' },
  { key: 'JOIN_DISCORD', name: '加入 Discord' },
  { key: 'JOIN_TELEGRAM', name: '加入 Telegram' },
  { key: 'VISIT_PAGE', name: '浏览网页' }
]
