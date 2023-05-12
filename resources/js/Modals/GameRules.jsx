import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

export function GameRules() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="outline-info" onClick={handleShow} className={'w-auto mx-auto my-3 my-xl-2 mt-4 mt-xl-3'}>
            Game Rules
            </Button>
            <Modal show={show} onHide={handleClose} className={'text-center'}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Rules</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 id={'Goal'}>
                        The goal is to get rid of your cards.
                    </h4>
                    <p>
                        If there are no cards in the stack and it is your turn to play, simply pick any number of cards,
                        declare them, using the bar that will show on your screen when you select any cards,
                        and click "Play Cards"
                    </p>
                    <h5 id={'Bluffing'}>
                        Bluffing
                    </h5>
                    <p>
                        If what you declared, doesn't match all the cards you actually played, that means you bluffed.
                    </p>
                    <p>
                        The other player can either choose to pass the turn, or call a bluff on you revealing the cards.
                        In that case you take your cards back and it's the other player's turn to play.
                    </p>
                    <p>
                        If you haven't bluffed and the other player calls a bluff on you,
                        the other player gets all the cards from the stack and it is your turn to play.
                    </p>
                    <h5 id={'Passing_Turn'}>
                        Passing Turn
                    </h5>
                    <p>
                        If you do not want play any cards, you can simply pass your turn.
                        ( You can only pass your turn when there are cards in the stack. )
                        The next player can either choose to pass the turn as well,
                        clearing the stack, or play more cards.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
