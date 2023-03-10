export const ALCHEMY_POLYGON_AD3_KEY =
  'https://polygon-mainnet.g.alchemy.com/v2/5aSHl7b-uw8NS_voiPDrdHDp5s7LEJhF'

export const ALCHEMY_MAINNET_AD3_KEY =
  'https://eth-mainnet.g.alchemy.com/v2/dyCEPWX_mo0xyKvBoURmAm4jZHV9dUWf'

export const ALCHEMY_MUMBAI_AD3_KEY =
  'https://polygon-mumbai.g.alchemy.com/v2/Ko5Mfq83UFafu5lEO_znMcqjoTgRaWJ7'

export const PRO_API_PREFIX = 'https://www.adventure3.tk'

export const API_PREFIX = location.origin

export const ENV =
  window.location.search.indexOf('env=test') >= 0
    ? 'test'
    : window.location.search.indexOf('env=daily') >= 0
    ? 'daily'
    : 'test'

export const AD3HUB_ADDRESS =
  ENV === 'test'
    ? '0x16b10cA75c518065125991AaFd344189594Fe4Dc'
    : ENV === 'daily'
    ? '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    : '0x16b10cA75c518065125991AaFd344189594Fe4Dc'

export const USDT_TOKEN_ADDRESS =
  ENV === 'test'
    ? '0x4F17af30a1479944c3F7E55897Dc2DEC0766B06A'
    : ENV === 'daily'
    ? '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    : '0x4F17af30a1479944c3F7E55897Dc2DEC0766B06A'

export const TASK_TYPE = [
  {
    key: 'FOLLOW_TWITTER',
    name: '关注推特',
    iconUrl: 'twitter-icon.png'
  },
  {
    key: 'RETWEET',
    name: '转发推特',
    iconUrl: 'twitter-icon.png'
  },
  {
    key: 'JOIN_DISCORD',
    name: '加入 Discord',
    iconUrl: 'discord-icon.png'
  },
  {
    key: 'JOIN_TELEGRAM',
    name: '加入 Telegram',
    iconUrl: 'telegram-icon.png'
  },
  { key: 'VISIT_PAGE', name: '浏览网页', iconUrl: 'website.png' }
]
