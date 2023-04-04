export const ALCHEMY_POLYGON_AD3_KEY =
  'https://polygon-mainnet.g.alchemy.com/v2/5aSHl7b-uw8NS_voiPDrdHDp5s7LEJhF'

export const ALCHEMY_MUMBAI_AD3_KEY =
  'https://polygon-mumbai.g.alchemy.com/v2/Ko5Mfq83UFafu5lEO_znMcqjoTgRaWJ7'

export const ALCHEMY_POLYGON_AD3_PRIVATE_KEY = '5aSHl7b-uw8NS_voiPDrdHDp5s7LEJhF'

export const ALCHEMY_MUMBAI_AD3_PRIVATE_KEY = 'Ko5Mfq83UFafu5lEO_znMcqjoTgRaWJ7'

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
    ? '0xeCD374aB5EF4D1CDcB53977d9051EaEFdEf314b9'
    : ENV === 'daily'
    ? '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    : '0x47083DA196Ec7a59b096F8E02b8827a105c20477'

export const USDT_TOKEN_ADDRESS =
  ENV === 'test'
    ? '0x1896E1331FCb0DDd76086aadF797A09fFea5EA46'
    : ENV === 'daily'
    ? '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    : '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'

export const ALCHEMY_PRIVATE_KEY =
  ENV === 'test' ? ALCHEMY_MUMBAI_AD3_PRIVATE_KEY : ALCHEMY_POLYGON_AD3_PRIVATE_KEY

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
