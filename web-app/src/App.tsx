import { useState } from 'react'
import './App.css'
import { GameScreen, IntroPage } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [displayGame, setDisplayGame] = useState(false);
    const [initialMessage, setInitialMessage] = useState('');
    const [code, setCode] = useState('');

    // initial data to local storage
    localStorage.setItem("journey", JSON.stringify({ scenario: '', conversation: [] }))

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
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100">
                {displayGame ? <GameScreen initialMessage={initialMessage} code={code} /> : <IntroPage setDisplayGame={setDisplayGame} setInitialMessage={setInitialMessage} setCode={setCode} />}
            </div>
        </>
    )
}

export default App
