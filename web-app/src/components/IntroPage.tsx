import { InputField } from "./InputField";

type Props = {
    setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>
    setInitialMessage: React.Dispatch<React.SetStateAction<string>>
    setCode: React.Dispatch<React.SetStateAction<string>>
}

export function IntroPage({ setDisplayGame, setInitialMessage, setCode }: Props) {
    return (
        <div className="pt-20 mx-20">
            <div className="font-extrabold text-white text-5xl">
                <label className="[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">Enter the code</label>
            </div>
            <InputField setDisplayGame={setDisplayGame} setInitialMessage={setInitialMessage} setUpperCode={setCode} />
        </div>
    )
}