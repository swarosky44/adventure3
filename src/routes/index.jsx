import loadable from '@loadable/component'
import { createBrowserRouter } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import BasicLayout from '@/layouts/basic'

const Home = loadable(() => import('@/pages/home'))
const MHome = loadable(() => import('@/pages/mhome'))
const Detail = loadable(() => import('@/pages/detail'))
const Backend = loadable(() => import('@/pages/backend'))
const BackendList = loadable(() => import('@/pages/backendList'))
const BackendDetail = loadable(() => import('@/pages/backendDetail'))
const EncryptoCampaign = loadable(() => import('@/pages/encrypto/campaign'))
const Profile = loadable(() => import('@/pages/profile'))

const routesConfig = createBrowserRouter([
  {
    path: '/detail',
    element: <Detail />
  },
  {
    path: '/backend',
    element: <BasicLayout />,
    children: [
      {
        path: 'list',
        element: <BackendList />
      },
      {
        path: 'detail',
        element: <BackendDetail />
      },
      {
        path: 'create',
        element: <Backend />
      }
    ]
  },
  {
    //  create a route /profile
    path: '/profile',
    element: <Profile />
  },
  // 内部使用
  {
    path: '/encrypto',
    element: <EncryptoCampaign />
  },
  {
    path: '/',
    element: isMobile ? <MHome /> : <Home />
  }
])

export default routesConfig
