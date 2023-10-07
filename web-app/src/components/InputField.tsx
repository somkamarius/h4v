import { useState } from "react"
import JourneyService from "../service";


type Props = {
    setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>
}

export function InputField({ setDisplayGame }: Props) {
    const [code, setCode] = useState<string>('');

    const isValid = (code: string): boolean => {
        if (code.length !== 4) {
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (isValid(code)) {
            // submit
            JourneyService.sendCode(code)
            setDisplayGame(true)
            return;
        }

        window.alert('Incorrect code')
    }

    return <div>
        <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" />
            <input onBlur={(event) => setCode(event.target.value)} type="text" name="price" id="price" className="mt-4 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="####" />

        </div>
        <button onClick={handleSubmit} type="submit" className="mt-8 block w-full rounded-md text-red-200 text-semibold bg-white py-2.5 text-center text-sm font-semiboldshadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Begin the journey
        </button>
    </div>
}