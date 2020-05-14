import axios from '../../lib/axios'
import { getRedirectPath } from '../../util'

// actionTypes
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const defaultState = {
    isAuth: '',
    msg: '',
    username: '',
    type: '',
    redirectTo: ''
}

const user = (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...newState, msg: 'success', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
        case LOGIN_SUCCESS:
            return { ...newState, msg: 'success', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
        case LOAD_DATA:
            return { ...newState, ...action.payload }
        case ERROR_MSG:
            return { ...newState, msg: action.msg, isAuth: true }
            default:
            return newState
    }
}

// actionCreators
const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

const errorMsg = (msg) => {
    return {
        type: ERROR_MSG,
        msg
    }
}

export const loadData = (userinfo) => {
    return {
        type: LOAD_DATA,
        payload: userinfo
    }
}

// export const userInfo = () => {
//     return dispatch => {
//         axios.get('/user/info').then(res => {
//             if (res.status === 200) {
//                 if (res.data.code === 0) {
//                     dispatch.loadData(res.data.data)
//                 } else {
//                     this.props.history.push('/login')
//                 }
//             }
//         })    
//     }
// }

export const register = ({ username, pwd, repeatpwd, type}) => {
    if (!username || !pwd || !type) {
        return errorMsg('用户名和密码不能为空')
    }  
    if (pwd !== repeatpwd ) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/register', {username, pwd, type}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(registerSuccess({ username, pwd, type }))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export const login = ({username, pwd}) => {
    if (!username || !pwd) {
        return errorMsg('用户名和密码不能为空')
    }
    return dispatch => {
        axios.post('/user/login', { username, pwd }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export default user