import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '../const'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

export const setToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `${token}`
}

export const post = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<R> => {
  return api.post<T, R>(url, data, config)
}

export function getUserData(userId: number): Promise<AxiosResponse<any>> {
  return api.get(`userData?userId=${userId}`)
}

export function getCourse(): Promise<AxiosResponse<any>> {
  return api.get(`/api/v1/course`)
}