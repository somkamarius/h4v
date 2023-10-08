import { toast } from 'react-toastify'
import { Conversation } from '../common/types'
import JourneyService from '../service'
import { useEffect, useState } from 'react'

type Props = {
    initialMessage: string
    code: string
}

export function GameScreen({ initialMessage, code }: Props) {
    const [message, setMessage] = useState('')
    const [conversations, setConversations] = useState(
        JSON.parse(localStorage.getItem('journey') ?? '')?.conversation
    )
    const [isLoading, setIsLoading] = useState(false)
    const [isPolling, setIsPolling] = useState(true)
    const [fade, setFade] = useState(false)

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

    useEffect(() => {
        setFade(true)
    }, [])

    useEffect(() => {
        const loadConversation = async () => {
            if (isPolling) {
                setIsLoading(true)
                return await JourneyService.getConversationId(code)
                    .then(async (data) => {
                        let status = 'running'
                        while (status == 'running') {
                            await delay(500)
                            await JourneyService.getMessageStream(data.id).then(
                                (res) => {
                                    if (res.message) {
                                        const newCont: Conversation = {
                                            content: res.message,
                                            role: 'assistant',
                                        }

                                        setConversations([
                                            ...conversations,
                                            newCont,
                                        ])

                                        if (res.status === 'done') {
                                            const updatedJourneyData =
                                                JSON.parse(
                                                    localStorage.getItem(
                                                        'journey'
                                                    ) ?? ''
                                                )

                                            updatedJourneyData.conversation = [
                                                ...conversations,
                                                newCont,
                                            ]

                                            localStorage.setItem(
                                                'journey',
                                                JSON.stringify(
                                                    updatedJourneyData
                                                )
                                            )
                                        }
                                    }
                                    status = res.status
                                }
                            )
                        }
                    })
                    .then(() => {
                        setIsPolling(false)
                        setIsLoading(false)
                    })
            }
        }
        loadConversation()
    }, [isPolling])

    const handleSubmit = async () => {
        const messageToSend = message
        setIsPolling(true)
        setMessage('')
        setIsLoading(true)
        setConversations([
            ...conversations,
            { content: messageToSend, role: 'user' },
        ])
    }

    toast.dismiss()

    return (
        <div className="py-5">
            <div id="test" className="mx-3">
                <div className="flex w-full max-h-[600px] min-h-[600px] overflow-y-auto ">
                    <div className="mx-auto flex flex-col text-sm max-w-xs justify-items-stretch w-full">
                        <div
                            className={`w-full px-4 italic py-2 rounded-lg inline-block text-white transition-all duration-[3000ms] h-fit    ${fade ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {initialMessage}
                        </div>
                        {conversations.map(
                            (convo: Conversation, idx: number) => {
                                return (
                                    <div
                                        key={convo.content + idx}
                                        className={`${convo.role === 'assistant'
                                                ? 'justify-self-start bg-white text-left'
                                                : ' justify-self-end bg-indigo-200 text-right'
                                            } px-4 py-2 rounded-lg inline-block text-gray-600 h-fit `}
                                    >
                                        {convo.content}
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`transition-all duration-[3000ms] ${fade ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div className="mx-20 relative mt-12 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
                    <textarea
                        value={message}
                        disabled={isLoading}
                        onChange={(e) => setMessage(e.target.value)}
                        name="price"
                        id="price"
                        className="disabled:bg-slate-100 mt-4 block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder={
                            isLoading ? 'loading...' : 'Your message...'
                        }
                    />
                </div>

                <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    type="submit"
                    className="disabled:bg-slate-100 mt-4 text-red-200 font-bold transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 duration-300"
                >
                    {isLoading ? (
                        <>
                            {/* <div className="pt-1 mr-4 animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-red-200 rounded-full" role="status" aria-label="loading" /> */}
                            ...Loading
                        </>
                    ) : (
                        <label className="mb-4">Send </label>
                    )}
                </button>
            </div>
        </div>
    )
}
