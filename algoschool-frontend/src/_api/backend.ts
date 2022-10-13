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

export interface UserInfo{
  is_admin: boolean
  completed_problems: Set<string>
}

export function getUserData(): Promise<AxiosResponse<UserInfo>> {
  return api.post(`/api/v2/user_info`)
}

export function getCourse(): Promise<AxiosResponse<any>> {
  return api.get(`/api/v2/course`)
}

export function addCourseBlock(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/add_course_block', data)
}

export function addArticle(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/add_article', data)
}

export function addProblem(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/add_problem', data)
}

export function changeArticle(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/change_article', data)
}

export function changeProblem(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/change_problem', data)
}

export function removeCourseBlock(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/delete_course_block', data)
}

export function removeCourseBlockItem(data: object): Promise<AxiosResponse<any>> {
  return api.post('/api/v2/admin/delete_course_block_item', data)
}

export function submitSolution(code: string, problemId: string): Promise<AxiosResponse<any>> {
  return api.post('/api/v1/submission', {
    code: code,
    problem_id: problemId
  })
}