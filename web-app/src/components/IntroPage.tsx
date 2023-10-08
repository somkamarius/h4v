import { useState } from 'react'
import JourneyService from '../service'
import { toast } from 'react-toastify'

type Props = {
    setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>
    setInitialMessage: React.Dispatch<React.SetStateAction<string>>
    setUpperCode: React.Dispatch<React.SetStateAction<string>>
}

export function IntroPage({
    setDisplayGame,
    setInitialMessage,
    setUpperCode,
}: Props) {
    const [code, setCode] = useState<string>('')
    const [fade, setFade] = useState(false)

    const isValid = (code: string): boolean => {
        if (code.length !== 1) {
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        setFade(true)

        setTimeout(async () => {
            if (isValid(code)) {
                // submit
                setInitialMessage(await JourneyService.getMessage(code))
                setDisplayGame(true)
                return
            }

            toast('Incorrect code', { type: 'error' })
        }, 2000)
    }
    return (
        <div
            className={` bg-gray-800 min-h-screen transition-all duration-[3000ms] ${
                fade ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`pt-20 mx-20 transition-all duration-[2000ms] ${
                    !fade ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="font-extrabold text-white text-5xl">
                    <label className="[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
                        Enter the code
                    </label>
                </div>

                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
                    <input
                        onBlur={(event) => {
                            setCode(event.target.value)
                            setUpperCode(event.target.value)
                        }}
                        type="text"
                        name="price"
                        id="price"
                        className="mt-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="####"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className={`mt-4  transition-all duration-[3000ms]  ${
                        !fade ? 'text-grey-800' : 'text-purple-800'
                    }  font-bold bg-white`}
                >
                    Begin the journey
                </button>
            </div>
        </div>
    )
}
