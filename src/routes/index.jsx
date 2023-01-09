import loadable from '@loadable/component'
import { createBrowserRouter } from 'react-router-dom'
import BasicLayout from '@/layouts/basic'

const Home = loadable(() => import('@/pages/home'))
const Backend = loadable(() => import('@/pages/backend'))

const routesConfig = createBrowserRouter([
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
