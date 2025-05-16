import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/dashboard'
import Profile from './pages/MyProfile/MyProfile'
import createEvent from '../pages/createEvent'
import myEvents from '../pages/myEvents'
import HeaderApp, { logOut } from './components/footer/header/HeaderApp'

const headerRoot = document.getElementById('header-root')
const mainRoot = document.getElementById('main-root')

//verificar signature del token en cada peticion evita modificaciones del token, signature seria invalido + evito hacer fetch y extraigo informacion del usuario a traves de app.
//
function getUserFromToken() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null

    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload

    // payload es la parte central del token, donde reside la informacion del usuario, asi saco el role y lo que sea necesario
  } catch (error) {
    return null
  }
}

const routes = {
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/profile': Profile,
  '/myEvents': myEvents,
  '/createEvent': createEvent,
  '/': Login
}

function router() {
  const path = window.location.pathname

  const Render = router[path] || Dashboard

  const user = getUserFromToken()

  // necesario_?
  if (!user && !['/login', '/register'].includes(path)) {
    navigate('/login')
    return
  }

  // render after log
  if (user) {
    document.getElementById('header-root').innerHTML = HeaderApp(user)
  } else {
    document.getElementById('header-root').innerHTML = ''
  }

  document.getElementById('main-root').innerHTML = Render()

  window.addEventListener('popstate', router)
}

window.addEventListener('popstate', router)

// navegacion sin recargar
export function navigate(to) {
  history.pushState({}, '', to)
  router()
}

router()
