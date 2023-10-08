import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import JourneyService from '../service'

type Props = {
    code: string | null
}

export const Header = ({ code }: Props) => {
    const [openExitModal, setOpenExitModal] = useState<boolean>(false)
    const [endMessage, setEndMessage] = useState<string>('')

    useEffect(() => {
        if (openExitModal && code) {
            JourneyService.getEndMessage(code).then((res) => {
                setEndMessage(res)
            })
            code = null
        }
    }, [openExitModal])

    return (
        <>
            <header className="bg-white">
                <nav
                    className="mx-auto flex max-w-7xl items-center p-4 lg:px-8"
                    aria-label="Global"
                >
                    <button
                        className={`${
                            code ? 'text-black-200' : 'text-white'
                        } bg-white py-0 mr-[30px] }`}
                        onClick={() => {
                            setOpenExitModal(true)
                        }}
                    >
                        Back
                    </button>

                    <div className="flex lg:flex-1">
                        <a href="" className="-m-1.5 p-1.5 flex flex-row">
                            <label className="font-bold ml-4 text-black">
                                JourneyBot
                            </label>
                        </a>
                    </div>
                </nav>
            </header>

            <Modal show={openExitModal}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <div className="text-center mx-4">{endMessage}</div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="text-black-200 font-bold bg-white border-solid border-black mx-auto my-4"
                        onClick={() => {
                            setOpenExitModal(false)
                            window.location.href = ''
                        }}
                    >
                        Finish this Journey!
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
