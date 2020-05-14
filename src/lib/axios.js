import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.defaults.timeout = 3000
axios.defaults.baseURL = '/api'

const instance = axios.create()

instance.interceptors.request.use(config => {
    Toast.loading('Loading...')
    return config
})

instance.interceptors.response.use(res => {
    Toast.hide()
    return res
})

export default instance

