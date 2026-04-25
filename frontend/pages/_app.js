import '@/styles/globals.css'
import '@/styles/styles.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import AuthListener from '@/components/AuthListener'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* 🔐 Global auth + profile handler */}
      <AuthListener />

      {/* 🔄 Rest of the app */}
      <Component {...pageProps} />
    </Provider>
  )
}
