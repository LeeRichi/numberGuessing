import React from "react";
import { useState } from "react";
import './form.css';

export const Form = () =>
{
    const [items, setItems] = useState([])
    const [number, setNumber] = useState([]);
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1); 

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const timestamp = Date.now(); 
        const stamp = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
        setItems([...items, {
            id: items.length,
            time: stamp,
            number: number
        }])
    }

    const reGenerating = () =>
    {
        setRandomNum ( Math.floor(Math.random() * 100) + 1)
    }

    const resetHistory = () =>
    {
        setItems([]);
    }

    return (
        <div className="main">
            <h1>Guess a number from 1~100</h1>
            <div>
                <p>The number(randomly generated): {randomNum}
                    <button className="re-btn" onClick={reGenerating}>re-generate</button>
                </p>
            </div>
            
            <form onSubmit={handleSubmit} action='/'>
                <input type="number" required value={number} onChange={(e) => setNumber(e.target.value)} />
                <button type="submit" value=''><span>Submit</span></button>
            </form>

            <ul>
                {items.map(item => (
                    <li key={item.id} className={item.number == randomNum ? 'correct' : null }>
                        {item.time} Guessed {item.number} 
                        {
                         //rule
                         (item.number < 1 &&
                            <h4>the answer is between 1 and 100</h4>) ||
                         (item.number > 100 &&
                            <h4>the answer is between 1 and 100</h4>) ||
                         //answer
                         (item.number == randomNum &&
                            <h4>it's equal to the answer</h4>) ||
                         //more or less
                         (item.number > randomNum &&
                            <h4>it's more than the answer</h4>) ||
                         (item.number < randomNum &&
                            <h4>it's less than the answer</h4>)
                        }

                    </li>
                ))}
            </ul>
            <button className="re-btn" onClick={resetHistory}>reset history</button>
        </div>
    )
}


export default Form;