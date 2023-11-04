const express = require('express')
const path = require('path')
const app = express()

const pathRoot = path.resolve(__dirname, '../public')

app.use(express.static(pathRoot))

// 允许跨域
app.use(require('./corsModdleware'))
// 加入cookie-parser中间件
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('./loginModdleware'))

const studentRouter = express.Router()
const adminRouter = express.Router()
// app.post('/api/student', (req, res) => {
//   console.log(req.body);
//   res.send('da')
// })

// 得到所有学生
studentRouter.get('/', (req, res) => {
  res.send({
    data:"所有学生"
  })
})
// 得到某一个学生
studentRouter.get('/:id', (req, res) => {
  res.send('得到某一个学生')
})
// 修改学生信息
studentRouter.put('/:id', (req, res) => {
  console.log(req.body);
  res.send(req.body)
})
// 添加一个学生
studentRouter.post('/', (req, res) => {
  res.send(`添加一个学生,学生信息为${req.body}`)
})
// 删除一个学生
studentRouter.delete('/:id', (req, res) => {
  res.send(`删除id为${req.params.id}的学生`)
})

// 登录
adminRouter.post('/login', (req, res) => {
  console.log(req.body);
  // res.header("set-cookie", `token=${req.body.loginId}; path=/; domain=localhost; max-age=3600`)
  res.cookie('token', req.body.loginId, {
    path: '/',
    domain: '127.0.0.1',
    maxAge: 7 * 24 * 3600 * 1000 // 一周过期
  })
  res.header('authorization', `Bearer ${req.body.loginId}`)
  if (req.body.loginId === 'admin' && req.body.loginPwd == 123456) {
    res.send({
      data: '登陆成功'
    })
  }
  else {
    res.send('账号或密码错误')
  }
})
app.use('/api/student', studentRouter)
app.use('/api', adminRouter)

app.use(require('./errorModdleware.js'))

// 启动服务器
app.listen(8080, () => {
  console.log('服务已启动');
})