/* eslint-disable */
import { request } from '@/utils/request'

import { apiBaseUrl as  BaseUrl } from '@/utils/domain';


export const GetData = (options={data:{}}) => {
  return request(`${BaseUrl}/MathDict/GetData`, {
    method: 'POST',
    ...options
  })
}
