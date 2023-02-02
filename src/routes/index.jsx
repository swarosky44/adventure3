import loadable from '@loadable/component'
import { createBrowserRouter } from 'react-router-dom'
import BasicLayout from '@/layouts/basic'

const Home = loadable(() => import('@/pages/home'))
const Backend = loadable(() => import('@/pages/backend'))
const Detail = loadable(() => import('@/pages/detail'))

const routesConfig = createBrowserRouter([
  {
    path: '/detail',
    element: <Detail />
  },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'backend',
        element: <Backend />
      },
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

export default routesConfig
