import loadable from '@loadable/component'
import { createBrowserRouter } from 'react-router-dom'
import BasicLayout from '@/layouts/basic'

const Home = loadable(() => import('@/pages/home'))
const Detail = loadable(() => import('@/pages/detail'))
const Backend = loadable(() => import('@/pages/backend'))
const BackendList = loadable(() => import('@/pages/backendList'))
const BackendDetail = loadable(() => import('@/pages/backendDetail'));
const Profile = loadable(() => import('@/pages/profile'));

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
      },
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    //  create a route /profile
    path: '/profile',
    element: <Profile />
  }
])

export default routesConfig
