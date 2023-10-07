// import { toast } from 'react-toastify'
import { SERVER_URL } from './common/constants'
import http from './common/http-common'
import { Journey } from './common/types'

const BASE_URL = SERVER_URL

class JourneyService {
    async sendCode(code: string) {
        const existingJourneyData: Journey = JSON.parse(
            localStorage.getItem('journey') ?? ''
        )
        const updatedJourneyData: Journey = {
            scenario: code,
            conversation: existingJourneyData.conversation,
        }

        return http
            .post<unknown>(
                `${BASE_URL}/jsonBlob`,
                JSON.stringify(updatedJourneyData)
            )
            .then((res) =>
                res.status === 200 || res.status === 201
                    ? console.log('success')
                    : window.alert('call failed - code send')
            )
    }

    async sendMessage(message: string) {
        const existingJourneyData: Journey = JSON.parse(
            localStorage.getItem('journey') ?? ''
        )
        const updatedJourneyData: Journey = {
            scenario: existingJourneyData.scenario,
            conversation: [...existingJourneyData.conversation, message],
        }

        return http
            .post<unknown>(
                `${BASE_URL}/jsonBlob`,
                JSON.stringify(updatedJourneyData)
            )
            .then((res) =>
                res.status === 200 || res.status === 201
                    ? console.log('success')
                    : window.alert('call failed - message send')
            )
    }
}

export default new JourneyService()
