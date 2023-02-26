/* eslint-disable */
import { request } from '@/utils/request'

import { apiBaseUrl as  BaseUrl } from '@/utils/domain';



export const SysSettingGetData = (options) => {

  return request(`${BaseUrl}/SysSetting/GetDataM`, {
    method: 'POST',
    ...options
  })
}

 






