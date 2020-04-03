import axios from './axios'
import { tokenFormated } from './../services/authenticate'

export const updateOrCreateUserStatus = async (data) => {
    return console.log(axios.put('user-status', data, { headers: { authorization: await tokenFormated() } }))
}
