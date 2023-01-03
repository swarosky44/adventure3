import loadable from '@loadable/component'
import { createBrowserRouter } from 'react-router-dom'
import BasicLayout from '@/layouts/basic'

const Home = loadable(() => import('@/pages/home'))
const Advertiser = loadable(() => import('@/pages/advertiserForm'))

const routesConfig = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'advertiser',
        element: <Advertiser />
      },
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

export default routesConfig
