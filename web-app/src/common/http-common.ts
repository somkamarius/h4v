import axios from 'axios'
import { SERVER_URL } from './constants'

export default axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-type': 'application/json',
    },
})
