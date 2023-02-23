import axios from 'axios'
import { ethers } from 'ethers'
import { PRO_API_PREFIX, API_PREFIX, ENV } from '@/utils/const'

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

export const getCurrentGasPrice = async () => {
  let maxFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
  let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
  try {
    const { data } = await axios({
      method: 'get',
      url:
        ENV === 'test'
          ? 'https://gasstation-mainnet.matic.network/v2'
          : 'https://gasstation-mumbai.matic.today/v2'
    })
    maxFeePerGas = ethers.utils.parseUnits(String(Math.ceil(data.fast.maxFee)), 'gwei')
    maxPriorityFeePerGas = ethers.utils.parseUnits(String(Math.ceil(data.fast.maxPriorityFee)), 'gwei')
  } catch {
    // ignore
  }

  return {
    maxFeePerGas,
    maxPriorityFeePerGas
  }
}
