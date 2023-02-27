/* eslint-disable */
import { request } from '@/utils/request'

import { apiBaseUrl as  BaseUrl } from '@/utils/domain';



export const GetSingleData = (options) => {

  return request(`${BaseUrl}/UserInfo/GetSingleData`, {
    method: 'POST',
    ...options
  })
}

export const GetUserById = (options) => {

  return request(`${BaseUrl}/UserInfo/GetUserById`, {
    method: 'POST',
    ...options
  })
}

export const ChangePWD = (options) => {

  return request(`${BaseUrl}/UserInfo/ChangePWD`, {
    method: 'POST',
    ...options
  })
}










