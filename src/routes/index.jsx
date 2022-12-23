import loadable from '@loadable/component'
import { createBrowserRouter } from 'react-router-dom'
import BasicLayout from '@/layouts/basic'

const Home = loadable(() => import('@/pages/home'))
const Test = loadable(() => import('@/pages/test'))

const routesConfig = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'test',
        element: <Test />
      },
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

export default routesConfig
