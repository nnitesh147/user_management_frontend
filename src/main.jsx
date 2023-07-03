import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext({ isAuthenticated: false });
 
const AppWrappper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        user,
        setuser,
      }}
    >
      <App />
    </Context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrappper />
  </React.StrictMode>,
)
