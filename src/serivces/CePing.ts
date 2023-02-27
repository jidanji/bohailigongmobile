/* eslint-disable */
import { request } from '@/utils/request';

import { apiBaseUrl as BaseUrl } from '@/utils/domain';

export const GetData = options => {
  return request(`${BaseUrl}/CePing/GetData`, {
    method: 'POST',
    ...options,
  });
};

export const CePing = options => {
  return request(`${BaseUrl}/CePing/CePing`, {
    method: 'POST',
    ...options,
  });
};

export const ToMeGetData = options => {
  return request(`${BaseUrl}/ToMe/GetData`, {
    method: 'POST',
    ...options,
  });
};

export const GetCepingDetails = options => {
  return request(`${BaseUrl}/Ceping/GetCepingDetails`, {
    method: 'POST',
    ...options,
  });
};

export const getdata = options => {
  return request(`${BaseUrl}/DictType/getdata`, {
    method: 'POST',
    ...options,
  });
};

export const AddShiTi = options => {
  return request(`${BaseUrl}/Shiti/AddShiTi`, {
    method: 'POST',
    ...options,
  });
};
