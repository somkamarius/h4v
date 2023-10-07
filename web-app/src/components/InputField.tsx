import { useState } from "react"
import JourneyService from "../service";
import { toast } from "react-toastify";


type Props = {
    setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>
    setInitialMessage: React.Dispatch<React.SetStateAction<string>>
    setUpperCode: React.Dispatch<React.SetStateAction<string>>
}

export function InputField({ setDisplayGame, setInitialMessage, setUpperCode }: Props) {
    const [code, setCode] = useState<string>('');

    const isValid = (code: string): boolean => {
        if (code.length !== 1) {
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        if (isValid(code)) {
            // submit
            setInitialMessage(await JourneyService.getMessage(code))
            setDisplayGame(true)
            return;
        }

        toast('Incorrect code', { type: "error" })
    }

    return <div>
        <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
            <input onBlur={(event) => { setCode(event.target.value); setUpperCode(event.target.value) }} type="text" name="price" id="price" className="mt-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="####" />
        </div>
        <button onClick={handleSubmit} type="submit" className="mt-4 text-red-200 font-bold transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 duration-300">
            Begin the journey
        </button>
    </div>
}