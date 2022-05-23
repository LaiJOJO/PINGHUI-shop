
export const saveToken = (token) => {
  return localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
  return localStorage.removeItem('TOKEN')
}