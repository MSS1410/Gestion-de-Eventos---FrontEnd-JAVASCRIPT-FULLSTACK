import { request } from '../../services/api.js'
import './dashboard.css'
import Swiper from 'swiper'
import 'swiper/css'

export default function Dashboard() {
  const html = `
      <section class="events-list">
        <h2>Eventos Disponibles</h2>
          <ul id="events-list"></ul>
       </section>

       <aside class="users-list">
           <h2>eTOMIC Community</h2>
           <ul id="users-list"></ul>
        </aside>

        <section class="events-swiper">
          <div id="swiper-container" class="swiper">
          <div class="swiper-wrapper"></div>
          </div>
        </section>
          
          `

  ;(async () => {
    try {
      // carga de eventos
      const events = await request('/events')
      const listHTML = events
        .map((ev) => {
          const fecha = new Date(ev.date).toLocaleDateString()
          return `<li>${fecha} — ${ev.title}</li>`
        })
        .join('')
      //USERS ASIDE
      const users = await request('/users')
      const usersHTML = users
        .map(
          (user) =>
            `<li>
          <img src="${user.avatarLink}" class="avatar-sm" /> ${user.name}
          </li>`
        )
        .join('')
      document.getElementById('users-list').innerHTML = usersHTML

      //SWIPER

      const wrapper = document.querySelector(
        '#swiper-container .swiper-wrapper'
      )
      events.forEach((eve) => {
        const slide = document.createElement('div')
        slide.className = 'swiper-slide'

        slide.innerHTML = `<img src="${eve.eventImageUrl}" alt="${eve.title}" />`
        wrapper.append(slide)
      })

      new Swiper('#swiper-container', {
        loop: true,
        autoplay: { delay: 3000 },
        slidesPerView: 1,
        spaceBetween: 10
      })
    } catch (error) {
      console.error('error while loading Dashboard:', error)

      document.getElementById('events-list').innerHTML =
        '<li>Error cargando eventos</li>'

      document.getElementById('users-list').innerHTML =
        '<li>Error cargando usuarios</li>'
    }
  })()

  return html
}
