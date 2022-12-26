import Layout from '../components/Layout'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Login from './login'
export default function Home() {
  return (
    <Provider store={store}>
      {/* <div className="text">
        <Layout />
      </div> */}
      <Login />
    </Provider>
  )
}
