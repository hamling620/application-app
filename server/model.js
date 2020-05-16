const mongoose = require('mongoose')

// 使用mongodb并使用applications这个集合
const DB_URL = 'mongodb://localhost:27017/applications'
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection Success')
    }
})

const models = {
    user: {
        'username': { 'type': String, 'required': true },
        'pwd': { 'type': String, 'required': true },
        'type': { 'type': String, 'required': true },
        'avatar': { 'type': String},
        'desc': { 'type': String},
        'title': { 'type': String},
        'company': { 'type': String},
        'money': { 'type': String}
    },
    chat: {
        'chatid': { 'type': String, 'require': true },
        'from': { 'type': String, 'require': true },
        'to': { 'type': String, 'require': true },
        'read': { 'type': Boolean, 'default': false },
        'content': { 'type': String, 'require': true, 'default': '' },
        'createtime': { 'type': Number, 'default': new Date().getTime()}
    }
}

for (let i in models) {
    mongoose.model(i, new mongoose.Schema(models[i]))
}

module.exports = {
    getModel: name => {
        return mongoose.model(name)
    }
}
