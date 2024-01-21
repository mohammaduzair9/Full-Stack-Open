import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getCityWeather = city => {
  const request = axios.get(`${baseUrl}q=${city}&units=metric&appid=${api_key}`)
  return request.then(response => response.data)
}

export default { getCityWeather }