import axios from '../../lib/axios'

const USER_LIST = 'USER_LIST'

const defaultState = {
    userList: []
}

const chatUser = (state = defaultState, action) => {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList: action.payload }
            default:
            return state
    }
}

const userList = (data) => {
    return {
        type: USER_LIST,
        payload: data
    }
}

export const getUserList = type => {
    return dispatch => {
        axios.get(`/user/list?type=${type}`).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(userList(res.data.data))
            }
        })
    }
}

export default chatUser