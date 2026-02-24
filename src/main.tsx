import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/index.scss'
import App from './App.tsx'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
         <App />
        </Provider>
      </BrowserRouter>
  </StrictMode>,
)
