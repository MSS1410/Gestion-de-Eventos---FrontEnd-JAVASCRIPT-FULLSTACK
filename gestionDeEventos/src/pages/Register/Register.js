import './register.css'
import { request } from '../../services/api'
import { navigate } from '../../app'

export default function Register() {
  // render form

  const html = `
   <div class="auth-container">
     <h2>Sign Up</h2>
         <form id="RegisterForm">
        <label for="register-name">Name</label>
       <input id="register-name" name="name" type="text" placeholder="your name" required />

     <label for="register-email">Email</label>
     <input id="register-email" name="email" type="email" placeholder="your email" required />

        <label for="register-password">Contraseña</label>
          <input id="register-password" name="password" type="password"
         placeholder="your password" required minlength="6" />

             <button type="submit">Sign Up</button>
        </form>
     <button id="toLogin" class="toLog">Log In</button>
   </div>
 `

  document.getElementById('main-root').innerHTML = html

  // registro
  const Regform = document.getElementById('registerForm')
  Regform.addEventListener('submit', async (eve) => {
    eve.preventDefault()

    const name = Regform.name.value
    const email = Regform.email.value
    const password = Regform.password.value

    try {
      const { token, user } = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      })
      alert('Account correctly created! Log In required.')
      localStorage.setItem('token', token)
      // envio a
      navigate('Login')
    } catch (error) {
      alert(error.message)
    }
  })

  //back login

  document.getElementById('toLogin').addEventListener('click', () => {
    navigate('/login')
  })
}
