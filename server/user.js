const express = require('express')
const Router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

function md5Pwd (pwd) {
    let salt = 'hubeishenghuangmeixianxiaochizhen@1234'
    return utils.md5(utils.md5(pwd + salt))
}

Router.get('/list', (req, res) => {
    const { type } = req.query
    User.find({type}, (err, doc) => {
        if (!err) {
            return res.json({code: 0, data: doc})
        }
    })
})

Router.post('/register', (req, res) => {
    const { username, pwd, type } = req.body
    User.findOne({username}, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        const userModel = new User({username, pwd: md5Pwd(pwd), type})
        userModel.save((err, doc) => {
            if (err) {
                return res.json({code: 1, msg: '服务器内部错误'})
            }  
            if (doc) {
                const { username, type, _id } = doc
                res.cookie('userid', _id)
                return res.json({code: 0, data: {username, type, _id}})
            }      
        })
    })
})

Router.post('/login', (req, res) => {
    const { username, pwd } = req.body
    User.findOne({username, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        // 登录成功SetCookie
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

Router.get('/info', (req, res) => {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '服务器内部错误'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
})

Router.post('/update', (req, res) => {
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({code: 0})
    }
    User.findByIdAndUpdate(userid, req.body, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '服务器内部错误'})
        }
        const data = Object.assign({}, {user: doc.user, type: doc.type }, req.body)
        return res.json({code: 0, data})
    })
})

module.exports = Router