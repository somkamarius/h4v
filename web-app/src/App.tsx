import { useState } from 'react'
import './App.css'
import { GameScreen, IntroPage } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';

function App() {
    const [displayGame, setDisplayGame] = useState(false)
    const [initialMessage, setInitialMessage] = useState('')
    const [code, setCode] = useState('')

    // initial data to local storage
    localStorage.setItem(
        'journey',
        JSON.stringify({ scenario: '', conversation: [] })
    )

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-gray-800 via-purple-800 to-violet-600">
                {displayGame ? <GameScreen initialMessage={initialMessage} code={code} /> : <IntroPage setDisplayGame={setDisplayGame} setInitialMessage={setInitialMessage} setUpperCode={setCode} />}
            </div>
        </>
    )
}

export default App
