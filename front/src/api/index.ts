import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'


const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL ?? 'http://localhost:8080/',
})

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  return config
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error)
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response
}

function onResponseError(error: AxiosError): Promise<AxiosError> {
  if (error.response && error.response.data && error.response.data.message) {
    error.message = error.response.data.message
  } else if (error.code === 'ERR_NETWORK') {
    error.message = 'Falha na conexão com o servidor'
  }

  return Promise.reject(error) // Always return a rejected Promise to propagate the error
}
api.interceptors.request.use(onRequest, onRequestError)
api.interceptors.response.use(onResponse, onResponseError)

export { api }
