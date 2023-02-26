/* eslint-disable */
import { request } from '@/utils/request'

import { apiBaseUrl as  BaseUrl } from '@/utils/domain';


export const GetGroup = (options={data:{}}) => {
  return request(`${BaseUrl}/Dict/GetGroup`, {
    method: 'POST',
    ...options
  })
}
