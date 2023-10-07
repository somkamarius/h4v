// import { toast } from 'react-toastify'
import { toast } from 'react-toastify'
import { SERVER_URL } from './common/constants'
import http from './common/http-common'
import { Conversation, Journey } from './common/types'

const BASE_URL = SERVER_URL

class JourneyService {
    async getMessage(code: string): Promise<string> {
        return http.get<string>(`${BASE_URL}/initial/${code}`).then((res) => {
            if (res.status === 200) {
                return res.data
            }

            toast('Failed to initialize connection')
            return ''
        })
    }

    async sendCode(code: string) {
        const existingJourneyData: Journey = JSON.parse(
            localStorage.getItem('journey') ?? ''
        )
        const updatedJourneyData: Journey = {
            scenario: code,
            conversation: existingJourneyData.conversation,
        }
        localStorage.setItem('journey', JSON.stringify(updatedJourneyData))

        return http
            .post<unknown>(
                `${BASE_URL}/request`,
                JSON.stringify(updatedJourneyData)
            )
            .then((res) =>
                res.status === 200 || res.status === 201
                    ? res.data
                    : toast('Call to server failed', { type: 'error' })
            )
    }

    async sendMessage(message: Conversation) {
        const existingJourneyData: Journey = JSON.parse(
            localStorage.getItem('journey') ?? ''
        )
        const updatedJourneyData: Journey = {
            scenario: existingJourneyData.scenario,
            conversation: [...existingJourneyData.conversation, message],
        }

        return http
            .post<unknown>(
                `${BASE_URL}/request`,
                JSON.stringify(updatedJourneyData)
            )
            .then((res) =>
                res.status === 200 || res.status === 201
                    ? res.data
                    : toast('Call to server failed', { type: 'error' })
            )
    }
}

export default new JourneyService()
