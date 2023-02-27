/* eslint-disable */
import { request } from '@/utils/request'

import { apiBaseUrl as  BaseUrl } from '@/utils/domain';



export const AddStudent = (options) => {

  return request(`${BaseUrl}/Student/AddStudent`, {
    method: 'POST',
    ...options
  })
}

export const StudentGetData = (options) => {

  return request(`${BaseUrl}/Student/GetData`, {
    method: 'POST',
    ...options
  })
}

export const GengZhengStudent = (options) => {

  return request(`${BaseUrl}/Student/GengZhengStudent`, {
    method: 'POST',
    ...options
  })
}

export const GetTotal = (options) => {

  return request(`${BaseUrl}/Student/GetTotal`, {
    method: 'POST',
    ...options
  })
}





 






