// import { toast } from 'react-toastify'
import { toast } from 'react-toastify'
import { SERVER_URL } from './common/constants'
import http from './common/http-common'
import { Journey, MessageResponse, StreamingResponse } from './common/types'

const BASE_URL = SERVER_URL

class JourneyService {
    async getFacts(code: string): Promise<string> {
        return http.get<string>(`${BASE_URL}/facts/${code}`).then((res) => {
            if (res.status === 200) {
                return res.data
            }

            toast('Failed to initialize connection')
            return ''
        })
    }

    async getEndMessage(code: string): Promise<string> {
        return http
            .get<string>(`${BASE_URL}/end-message/${code}`)
            .then((res) => {
                if (res.status === 200) {
                    return res.data
                }

                toast('Failed to initialize connection')
                return ''
            })
    }

    async getMessage(code: string): Promise<string> {
        return http.get<string>(`${BASE_URL}/initial/${code}`).then((res) => {
            if (res.status === 200) {
                return res.data
            }

            toast('Failed to initialize connection')
            return ''
        })
    }

    async getConversationId(code: string): Promise<StreamingResponse> {
        const existingJourneyData: Journey = JSON.parse(
            localStorage.getItem('journey') ?? ''
        )
        const updatedJourneyData: Journey = {
            scenario: code,
            conversation: existingJourneyData.conversation,
        }
        localStorage.setItem('journey', JSON.stringify(updatedJourneyData))

        return http
            .post<StreamingResponse>(
                `${BASE_URL}/request-streaming`,
                JSON.stringify(updatedJourneyData)
            )
            .then((res) => {
                return res.data
            })
    }

    async getMessageStream(id: string): Promise<MessageResponse> {
        return http
            .get<MessageResponse>(`${BASE_URL}/request-streaming/` + id)
            .then((res) => {
                return res.data
            })
    }
}

export default new JourneyService()
