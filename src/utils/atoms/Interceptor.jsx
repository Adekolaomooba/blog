

import React, { useEffect } from 'react'

import { TokenAtom } from './TokenAtoms'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function Interceptor() {
  
  const [token, setToken] = useRecoilState(TokenAtom)
  

  useEffect(()=>{
    if (!token?.access) {
      return;
    }

    const requestInterceptor = axios.interceptors.request.use(
      (config)=>{
        const auth = token.access
        const decodeToken = jwtDecode(auth)
        const dateNow = new Date()  
           
        
        if (decodeToken.exp * 1000 < dateNow.getTime()) {
          console.log("Token expired, logging out...");
          setToken(null); 
          window.location.href = "/";
          return Promise.reject("Token expired");
        }
        config.headers.Authorization = `Bearer ${auth}`

        return config
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
    }
  }, [token, setToken])

  return (
    null
  )
}

export default Interceptor