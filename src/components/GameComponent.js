import React, { useState, useEffect, useContext, useRef } from 'react';
import accentData from "../resources/AccentData";
import { PlayerContext } from "../context/PlayerContext";
import "../scss/style.scss";

const GameComponent = () => {
    const [out, setOut] = useState('');
    const [quote, setQuote] = useState('');
    const [accent] = useState(accentData);
    const ref = useRef(false);
    const [timer, setTimer] = useState();
    const [difficulty, setDifficulty] = useState('easy');
        // eslint-disable-next-line no-unused-vars
    const [playerData, setPlayerData ] = useContext(PlayerContext);

    useEffect(() => {
        if (ref.current) {
            let numb = 15;
            let timerId;
            
            const countDown = () => {
                if (numb === 0) {
                    setTimer(numb);
                    clearInterval(timerId);
                    alert('Time Over!');
                } else {
                    setTimer(--numb);
                }
            }

            timerId = setInterval(countDown, 1000);
            
            // Cleanup function to prevent memory leaks
            return () => clearInterval(timerId);
        } else {
            ref.current = true;
        }
    }, [quote]);

    const accentDifficulty = e => {
        e.preventDefault();
        const btnValue = e.target.value;
        setDifficulty(btnValue);
    };

    const generateQuote = e => {
        e.preventDefault();
        const randomAccent = accent[difficulty][Math.floor(Math.random() * accent[difficulty].length)];
        setOut(randomAccent);
        accentDifficulty(e);
        
        fetch('https://dummyjson.com/quotes/random')
        .then(response=> response.json())
            .then(data => {
                setQuote(data.quote);
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                setQuote('Failed to fetch quote. Please try again.');
            });
    };

    return (
        <div className='GameContainer'>
            <div className='DifficultyContainer'>
                <h4>Select Difficulty</h4>
                <button className='Easy' value="easy" onClick={accentDifficulty}>Easy</button>
                <button className='Medium' value="medium" onClick={accentDifficulty}>Medium</button>
                <button className='Hard' value="hard" onClick={accentDifficulty}>Hard</button>
                <h4>Current Level: <span className='Difficulty'>{difficulty}</span></h4>
            </div>
            <div className='AccentContainer'>
                <div className='Timer'>
                    <p>{timer}</p>
                </div>
                <br />
                <p className='QuoteText'>{quote === '' ? '[Quotes will appear here]' : quote}</p>
                <p className='Accent'>{out === '' ? '[Accents will appear here]' : out + ' Accent'}</p>
            </div>
            <div className='GenerateBtnContainer'>
                <button 
                    className='GenerateBtn' 
                    disabled={timer > 0 || playerData.length < 1} 
                    onClick={generateQuote} 
                    value={difficulty}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default GameComponent;
