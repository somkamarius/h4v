import { useState } from 'react'
import './App.css'
import { GameScreen, IntroPage } from './components'

function App() {
    const [displayGame, setDisplayGame] = useState(false);

    // initial data to local storage
    localStorage.setItem("journey", JSON.stringify({ scenario: '', conversation: [] }))

    return (
        <div className="min-h-screen pt-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100">
            {displayGame ? <GameScreen /> : <IntroPage setDisplayGame={setDisplayGame} />}
        </div>
    )
}

export default App
