import axios from 'axios'


export function openWithoutReferrer(link: string) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(
    iframe,
  ).src = `javascript:"<script>top.location.replace('${link}')<\/script>"`
}

const defHttp = axios.create({
  baseURL: '/api',
  timeout: 60000,
  withCredentials: true,
})

defHttp.interceptors.request.use(
  (config: any) => {


    return config
  },
  (error) => {
    // do something with request error
    // console.log(error); // for debug
    return Promise.reject(error)
  },
)

defHttp.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0) {

      return res
    }
    else {
      return res.data
    }
  },
  (error) => {
    if (error?.response?.status === 401) {

    }
    else if (error?.response?.status === 403) {
      
    }
    else {
      
      return Promise.reject(error)
    }
  },
)

export const get = <T> (url: string, params = {}): Promise<T> => {
  return new Promise((resolve, reject) => {
    defHttp.get(url, { params }).then(
      (response) => {
        resolve(response.data as T)
      },
      (err) => {
        reject(err)
      },
    )
  })
}

export const post = <T> (url: string, data = {}): Promise<T> => {
  return new Promise((resolve, reject) => {
    defHttp
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          resolve(response.data as T)
        },
        (err) => {
          reject(err)
        },
      )
  })
}

export const patch = (url: string, data = {}) => {
  return new Promise((resolve, reject) => {
    defHttp
      .patch(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default defHttp
