import Card from "./Card";
import {AsCardBar} from "./AsCardBar";
import uuid from "react-uuid";
import {useContext, useState} from "react";
import {NextPlayerContext} from "../Contexts/NextPlayerContext";
import {RoomContext} from "../Contexts/RoomContext";
import {CardsPlayedContext} from "../Contexts/CardsPlayedContext";
import {UserContext} from "../Contexts/UserContext";
import {HeightContext} from "../Contexts/HeightContext";
import {PreviousMoveContext} from "../Contexts/PreviousMoveContext";

export default function CardStack({selected,cardStack,handleAs,children}) {
    const Cards = new Map([[1, "🂠"]]),
        selectedCards = selected;
    const CardStack = cardStack.map((card) => {
        return <Card card={Cards.get(1)}></Card>
    }), previousMove = useContext(PreviousMoveContext),cardsPlayed = useContext(CardsPlayedContext),
    User = useContext(UserContext),viewport_height = useContext(HeightContext),
    nextPlayer = useContext(NextPlayerContext);
    const height = (viewport_height < 395) ? (viewport_height < 361 ? '29%' : '47%') : '47%',
    margin = (viewport_height < 500) ? ' my-2' : '';
    return (
        <div className={'row text-center justify-content-center align-items-center my-4  my-md-0 cardstack px-2 '  + margin}
        style={{height:height}}>
            <div className='col-4 align-self-center'>
                {selectedCards.length>0 ? <AsCardBar key={uuid()} handleAs={handleAs} selected={selectedCards}></AsCardBar>:''}
            </div>
            <div className={'col-2 h5 align-self-center my-0'}>
                {CardStack.length!==0 ? 'Cards in the Stack : ' + CardStack.length : ''}
            </div>
            <div className='col-2 display-1 align-self-center my-0'>
                {(CardStack.length!==0 ) ? <Card card={Cards.get(1)} Stacked={true} ></Card>
                    : ''}
            </div>
            <div className='col-4 align-self-center'>
                {
                    //  The other player has played some cards
                    cardsPlayed && cardsPlayed.count ?
                    <div>
                        {
                            cardsPlayed.count === 1 ?
                            <div className={'ms-3'}>
                                <h5 className={'me-1'}>
                                    { previousMove &&  ((User.id === previousMove.User.id ? ' You ' : previousMove.User.name) +
                                        ' played ' + cardsPlayed.count + ' ' + cardsPlayed.number)}
                                </h5>
                            </div>
                            :
                            <div className={'ms-3'}>
                                <h5 className={'me-1'}>
                                    {previousMove && ((User.id === previousMove.User.id ? ' You ' : previousMove.User.name) +
                                        ' played ' + cardsPlayed.count + ' ' + cardsPlayed.number + "'s")}
                                </h5>
                            </div>
                        }
                    </div>
                    :
                    //    The other player has either passed or called a bluff.
                    <div>
                        <div>
                            {/*<h4 className={'me-1'}>*/}
                            {/*    {cardsPlayed.count}*/}
                            {/*</h4>*/}
                        </div>
                        {
                            cardsPlayed === 'Passed' ?
                                <div className={'ms-3'}>
                                    <h5>{previousMove && ((previousMove && User.id === previousMove.User.id ? 'You' : previousMove.User.name)
                                        + ' passed the turn.')}</h5>
                                </div>
                                : cardsPlayed === 'Bluff_Called' &&
                                <div className={'ms-3'}>
                                    <h5>{previousMove && ((previousMove && User.id === previousMove.User.id ? 'You' : previousMove.User.name)
                                        + ' called a bluff.')}
                                        {/*+ 'on ' + (User.id === previousMove.User.id ? 'you.' : previousMove.User.name))}*/}
                                    </h5>
                                </div>
                        }
                    </div>
                }
                {children}
            </div>
        </div>
    )
}
