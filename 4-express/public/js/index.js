const loginBtn = document.querySelector('.login')
const getStuBtn = document.querySelector('.getStudents')

loginBtn.onclick = function () {
  fetch('http://127.0.0.1:8080/api/login', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      loginId: 'admin',
      loginPwd: 123456
    }),
    credentials: 'include'  // 跨域时允许携带cookie
  }).then(resp => resp.json()).then(res => {
    console.log(res);
    if (res.token) {
      sessionStorage.setItem('token', res.token)
    }
  })
}

getStuBtn.onclick = function () {
  const token = sessionStorage.getItem('token') || ''
  fetch('http://127.0.0.1:8080/api/student', {
    method: 'GET',
    credentials: 'include', // 跨域时允许携带cookie
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then(resp => resp.json()).then(res => {
    console.log(res);
  })
}