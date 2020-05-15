import { combineReducers } from 'redux'
import user from './user'
import chatUser from './chatUser'

const reducers = combineReducers({ user, chatUser })

export default reducers