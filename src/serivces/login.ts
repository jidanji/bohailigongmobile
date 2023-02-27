/* eslint-disable */
import { request } from '@/utils/request'

import { apiBaseUrl as  BaseUrl } from '@/utils/domain';


export const ValidUser = ( options) => {
  return request(`${BaseUrl}/Login/ValidUser`, {
    method: 'POST',
    ...options
  })
}

export const LogOut = ( options) => {
  return request(`${BaseUrl}/Login/LogOut`, {
    method: 'POST',
    ...options
  })
}



export const GetBackPWD = ( options) => {
  return request(`${BaseUrl}/Login/GetBackPWD`, {
    method: 'POST',
    ...options
  })
}

 

 

export const LoginStatus = (options) => {
  return request(`${BaseUrl}/Login/LoginStatus`, {
    method: 'POST',
    ...options
  })
}



