import { request } from '../../services/api'
import { navigate } from '../../app'
import Swal from 'sweetalert2'

export default function Profile() {
  const root = document.getElementById('app')

  // fetch de datos

  async function loadUser() {
    try {
      const user = await request('/users/myProfile')
      render(user)
    } catch (error) {}
  }

  // renderizado
  function render(user) {
    root.innerHTML = `
    <h1>My Space</h1>
    <form id="profileForm" data-userId="{user._id} "enctype="multipart/form-data"

    <label>
    Name:
    <input name="name" value="${user.name}"/>
    </label>

    <label>
    Email:
    <input name="email" value="${user.email}"/>
    </label>

    <label>
    New Password:
    <input name="password" type="password" placeholder="*********"/>
    </label>
    

    <label>
    Avatar:
    <input name="avatar" type="file" accept="image/*"/>
    </label>

    <button type ="submit">Update changes</button>
    <button id="backButton" type="button">Back</button>

    </form>
    `

    // añado clicks en buttons

    document.getElementById('profileForm').addEventListener('submit', onSubmit)

    document
      .getElementById('backButton')
      .addEventListener('click', () => navigate('/dashboard'))

    // declaro la funcion onSubmit,

    async function onSubmit(eve) {
      eve.preventDefault()

      // recojo en formprofile todos los datos que se encuentran en el formulario, incluida el file. paso a FormData cada valor del formulario actualizado, este new se encara de asignar cada nombre con su correcto valor actualizado.

      //El objetivo es enviarlo a traves de fetch como  body en peticion multipart
      const FormProfile = eve.currentTarget
      const form = new FormData(FormProfile)

      try {
        const updatedProfile = await request(
          // FormProfile.dataset es un objeto que recoge todos los atributos html de mi form que empieze por data, el id: data-userId, se genera en formProfile propiedad .dataset que contiene el idUser

          `/users/${FormProfile.dataset.userId}/updateMe`,
          {
            method: 'PUT',
            body: form
          }
        )
        Swal.fire({
          title: 'Updated Profile Data',
          icon: 'succes',
          timer: 2000,
          showConfirmedButton: false
        })
      } catch (error) {
        await Swal.fire({
          title: 'Error while updating profile',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Got it!'
        })
      }
    }
  }

  loadUser()
}
