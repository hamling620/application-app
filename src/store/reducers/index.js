import { combineReducers } from 'redux'
import user from './user'
import chatUser from './chatUser'
import chat from './chat'

const reducers = combineReducers({ user, chatUser, chat })

export default reducers