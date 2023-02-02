import { PRO_API_PREFIX, API_PREFIX } from '@/utils/const'

export const request = ({ method = 'GET', api = '', params = {} }) => {
  let url = `${method === 'POST' ? PRO_API_PREFIX : API_PREFIX}/${api}`
  let options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method === 'GET') {
    const queryStr = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')
    url = `${url}?${queryStr}`
  } else if (method === 'POST') {
    options.body = JSON.stringify(params)
  }
  try {
    return window
      .fetch(url, options)
      .then((res) => res.json())
      .catch((err) => Promise.resolve(err))
  } catch (error) {
    console.warn(error)
    return Promise.resolve(null)
  }
}