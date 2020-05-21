import axios from '../../lib/axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:3001')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'


const defaultState = {
    chatmsg: [],
    users: {},
    unread: 0
}

const chat = (state = defaultState, action) => {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
                users: action.payload.users
            }
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1: 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread + n
            }
        case MSG_READ:
            return {
                ...state,
                chatmsg: state.chatmsg.map(item => ({...item, read: item.from === action.payload.from})),
                unread: state.unread - action.payload.num
            }
            default:
                return state
    }
}

const msgList = (msgs, users, userid) => ({ type: MSG_LIST, payload: { msgs, users, userid }})
const msgRecv = (msg, userid) => ({ type: MSG_RECV, payload: msg, userid})
const msgRead = (from, to, num) => ({ type: MSG_READ, payload: { from, to, num }})

export const getMsgList = () => {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
    }
}

export const sendMsg = (data) => {
    return dispatch => {
        socket.emit('sendmsg', data)
    }
}

export const recvMsg = () => {
    return (dispatch, getState) => {
        socket.on('recvmsg', data => {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

export const readMsg = (from) => {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', { from }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id  
                dispatch(msgRead(from, userid, res.data.num))  
            }
        })
    }
}

export default chat