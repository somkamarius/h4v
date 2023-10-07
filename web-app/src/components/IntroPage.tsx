import { InputField } from "./InputField";

type Props = {
    setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>
}

export function IntroPage({ setDisplayGame }: Props) {
    return (
        <div className="mx-20">
            <div className="font-extrabold text-white text-5xl">
                Enter the code
            </div>
            <InputField setDisplayGame={setDisplayGame} />
        </div>
    )
}