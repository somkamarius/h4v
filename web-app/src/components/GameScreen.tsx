import { toast } from "react-toastify"
import { Conversation, Journey } from "../common/types";
import JourneyService from "../service";
import { useEffect, useState } from "react";

type Props = {
    initialMessage: string;
    code: string;
}

export function GameScreen({ initialMessage, code }: Props) {
    const [message, setMessage] = useState('')
    const [conversations, setConversations] = useState(JSON.parse(localStorage.getItem('journey') ?? '')?.conversation)
    const [isLoading, setIsLoading] = useState(false);

    console.log(conversations)

    useEffect(() => {
        setIsLoading(true)
        const loadConversation = async () => {
            return await JourneyService.sendCode(code).then(data => {
                setConversations((data as Journey).conversation); localStorage.setItem('journey', JSON.stringify(data) ?? '')
            }).then(() => setIsLoading(false));
        }
        loadConversation();
    }, [])

    const handleSubmit = async () => {
        const messageToSend = message;
        setMessage('');
        setIsLoading(true)
        setConversations([...conversations, messageToSend]);
        await JourneyService.sendMessage({ role: 'user', content: messageToSend }).then(data => setConversations([...(data as Journey).conversation])).then(() => setIsLoading(false)).then(() => setIsLoading(false));
    }

    toast.dismiss();

    return (
        <div className="py-20">
            <div className="mx-6">
                <div className="flex w-full min-h-[50%]">
                    <div className="grid flex-col space-y-2 text-xs max-w-xs mx-2 order-2 justify-items-stretch w-full">
                        <div className={`px-4 italic py-2 rounded-lg inline-block text-gray-600`}>
                            {initialMessage}
                        </div>
                        {conversations.map((convo: Conversation, idx: number) => {
                            return (
                                <div key={convo.content + idx} className={`${convo.role === 'assistant' ? 'justify-self-start bg-white text-left' : ' justify-self-end bg-indigo-200 text-right'} px-4 py-2 rounded-lg inline-block text-gray-600`}>
                                    {convo.content}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div >


            <div className="mx-20 relative mt-12 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
                <textarea value={message} disabled={isLoading} onChange={(e) => setMessage(e.target.value)} name="price" id="price" className="disabled:bg-slate-100 mt-4 block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="your message" />
            </div>

            <button disabled={isLoading} onClick={handleSubmit} type="submit" className="disabled:bg-slate-100 mt-4 text-red-200 font-bold transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 duration-300">
                {isLoading ?
                    <>
                        {/* <div className="pt-1 mr-4 animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-red-200 rounded-full" role="status" aria-label="loading" /> */}
                        ...Loading
                    </>
                    : <label className="mb-4">Send </label>}
            </button>
        </div>
    )
}