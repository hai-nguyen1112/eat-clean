import axios from 'axios'

let instance

switch (window.location.hostname) {
    case 'localhost':
        instance = axios.create({baseURL: 'http://localhost:4000/api/v1'})
        break
    case 'eat-clean.netlify.com':
        instance = axios.create({baseURL: 'https://eat-clean-backend.herokuapp.com/api/v1'})
        break
    default:
        instance = axios.create({baseURL: 'http://localhost:4000/api/v1'})
}

export default instance