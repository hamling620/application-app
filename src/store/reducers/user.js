import axios from '../../lib/axios'
import { getRedirectPath } from '../../util'

// actionTypes
const AUTH_SUCCESS = 'AUTH_SUCCESS'
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
        case AUTH_SUCCESS:
            return { ...newState, msg: 'success', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case LOAD_DATA:
            return { ...newState, ...action.payload }
        case ERROR_MSG:
            return { ...newState, msg: action.msg, isAuth: true }
            default:
            return newState
    }
}

// actionCreators
const authSuccess = (data) => {
    const { pwd, ...payload} = data
    return {
        type: AUTH_SUCCESS,
        payload
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
                dispatch(authSuccess({ username, pwd, type }))
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
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export const update = (data) => {
    return dispatch => {
        axios.post('/user/update', data).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }    
}

export default user