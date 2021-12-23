import { useState, useEffect } from "react";

import Card from "../Card/Card";
import gameItems from '../../gameItems'
import Modal from "../Modal/Modal";

import './Cards.css'

const Cards = () => {

    //state
    const [cards, setCards] = useState(gameItems)
    const [firstChoice, setFirstChoice] = useState(null)
    const [secondChoice, setSecondChoice] = useState(null)
    const [disable, setDisable] = useState(false)
    const [rotationCounter, setRotationCounter] = useState(0)
    const [correctCounter, setCorrectCounter] = useState(0)
    const [modalShow, setModalShow] = useState(false)
    const [animation, setAnimation] = useState(false)

    // startGame
    const startGame = () => {
        const randomCards = [...gameItems].map((item) => {
            return { ...item, order: Math.floor(Math.random() * 16) }
        })
        setCards(randomCards)
        setRotationCounter(0)
        setCorrectCounter(0)
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
        }, 1000);
    }


    // clickedCardHandler
    const clickedCardHandler = (item) => {
        if (!disable) {
            if (firstChoice) {
                setSecondChoice(item)
            } else {
                setFirstChoice(item)
            }
        }
    }

    // run startGame
    useEffect(() => {
        startGame()
    }, [])


    //compare
    useEffect(() => {
        if (firstChoice && secondChoice) {

            setDisable(true)

            if (firstChoice.name === secondChoice.name && firstChoice.id !== secondChoice.id) {

                setCards(prevCards => {
                    return prevCards.map((item) => {
                        if (item.name === firstChoice.name && item.flipped === false) {
                            setCorrectCounter(prev => prev + 1)
                            correctCounterHandler()
                            return { ...item, flipped: true }

                        } else {
                            return item
                        }

                    })
                })

                resetSelections()

            } else if (firstChoice.name === secondChoice.name && firstChoice.id === secondChoice.id) {
                setSecondChoice(null)
                setDisable(false)
            } else if (firstChoice.name !== secondChoice.name && (firstChoice.flipped === true || secondChoice.flipped === true)) {
                firstChoice.flipped ? setFirstChoice(null) : setSecondChoice(null)
                setDisable(false)
            } else {
                setTimeout(() => {
                    resetSelections()
                }, 1500);
            }
        }
    }, [firstChoice, secondChoice, correctCounter])


    // resetSelections
    const resetSelections = () => {
        setFirstChoice(null)
        setSecondChoice(null)
        setDisable(false)
        setRotationCounter(prev => prev + 1)
    }


    // closeModalHandler
    const closeModalHandler = () => {
        setModalShow(false)
    }

    // correctCounterHandler
    const correctCounterHandler = () => {
        if (correctCounter === 14) {
            setModalShow(true)
        }
    }

    // return
    return (
        <div className="main">
            <div className="title">
                <h2>Memory Card Game with <span className="aqua-color">React</span></h2>
                <button onClick={startGame}>New Game</button>
            </div>
            <div className="cards" style={{ animationName: animation ? "show" : " " }}>
                {
                    cards.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                src={item.image}
                                order={item.order}
                                click={() => clickedCardHandler(item)}
                                flipped={item === firstChoice || item === secondChoice || item.flipped}

                            />
                        )
                    })
                }
            </div>
            <div className="result">
                <p>Rotation : <span className="aqua-color">{rotationCounter}</span></p>
                <a href="https://www.linkedin.com/in/mehrdad-fallah-086b041b4/">MF</a>
            </div>
            {

                modalShow ? <Modal click={closeModalHandler} modalShow={modalShow} /> : null

            }
        </div>
    )
}

export default Cards