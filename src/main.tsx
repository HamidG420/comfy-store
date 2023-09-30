import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import store from './store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" />
  </Provider>
  // </React.StrictMode>,
);
