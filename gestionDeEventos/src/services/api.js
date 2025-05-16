export async function request(path, options = {}) {
  const url = import.meta.env.VITE_API_URL + path

  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',

    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  }

  const res = await fetch(url, { ...options, headers })

  const data = await res.json()
  if (!res.ok) throw new Error(data.msg || 'Petition error')

  return data
}
