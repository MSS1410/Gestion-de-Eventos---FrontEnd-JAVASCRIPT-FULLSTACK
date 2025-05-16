import { navigate } from '../../../app'

export default function HeaderApp(user) {
  return `
  <header class= "header-app">
  <div class="name-logo">
    <h1 class="name">eTOMIC GDE<h1/>
    <img class="logo">
    <nav class="nav-app">

    <a 
    href="/dashboard" 
    onclick="event.preventDefault(); navigate("/dashboard")"
    aria-label:"Main - Home">
    <img src="/src/assets/icons/main.jpg" alt="" class="nav-icon"/>
    </a>

    <a 
    href="/profile
     onclick="event.preventDefault(); navigate("/profile")"
     aria-label:"My Profile">
     <img src="/src/assets/icons/profile.jpg" alt="" class="nav-icon"/>
     </a>

     <a
     href="/myEvents"
     onclick="event.preventDefault(); navigate("/myEvents")"
     aria-label="myEvents">
     <img src="/src/assets/icons/myEvents" alt="" class="nav-icon"/>
     </a>


     ${
       user.role === 'admin'
         ? `<a href="/createEvent" 
      onclick="event.preventDefault(); navigate("/createevent")"
      >Set an Event</a>`
         : ''
     }
     <a href="/login" onclick="event.preventDefault(); logOut()">Log Out</a>
     </nav>
     </header>
     `
}

//logout

export function logOut() {
  localStorage.removeItem('token')
  navigate('/login')
}
