import { request } from '../../services/api'
import { navigate } from '../../app'

export default function Login() {
  //render del formulario login

  const html = `
  <div class='auth-container'>
    <h2>Log In</h2>

    <form id='LogForm'>
      <label for='login-email'>Email</label>
      <input id='login-email' name='email' type='email'></input>

      <label for='login-password'>Email</label>
      <input
        id='login-password'
        name='password'
        type='password'
        placeholder='your password'
        required
      ></input>

      <button type='submit'>Log In</button>
    </form>
          <button id="toSignUp" class='toSign'>Sign Up</button>
  </div>

  `

  // Html al main

  document.getElementById('main-root').innerHTML = html

  const LogForm = document.getElementById('LogForm')

  LogForm.addEventListener('submit', async (eve) => {
    eve.preventDefault()

    const email = LogForm.email.value
    const password = LogForm.password.value

    try {
      const { token, user } = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      localStorage.setItem('token', token)
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  })

  // mostrar registro

  document.getElementById('toSignUp').addEventListener('click', () => {
    navigate('/register')
  })
}
