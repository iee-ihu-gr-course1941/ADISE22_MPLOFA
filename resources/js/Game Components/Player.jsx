import CardContainer from "./CardContainer";
import {useContext, useState} from "react";
import {CardsContext} from "../Contexts/CardsContext";
import {TurnContext} from "../Contexts/TurnContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";
import {UserContext} from "../Contexts/UserContext";
import {HeightContext} from "../Contexts/HeightContext";

export default function Player({Position,Enemy,onSubmit,children}) {
    const position = Position === 'Top' ? 'align-items-start ' : ' align-items-end',
    isEnemy = Enemy,
    size = Position === 'Top' ? 6 : 1,
    {myCards} = useContext(CardsContext),
    { enemyCards , setEnemyCards } = useContext(CardsContext),
    { myTurn,setMyTurn } = useContext(TurnContext),
    cardStackLength  = !isEnemy && useContext(StackContext),
    User = useContext(UserContext),
    { selectedCards,onSelectCard} = !isEnemy &&  useContext(SelectedCardsContext),
    viewport_height = useContext(HeightContext),
    height = (viewport_height < 500) ? (isEnemy ? ' h-25' : ' h-25') : ' h-25',
    margin = (viewport_height < 500 && !isEnemy) ? ' ' : '';
    // buttonColSize = (viewport_height < 500 ) ? '2' : '1';
    return (
        <div className={'row text-center text justify-content-center w-100 '
        + position + height + margin} style={{marginBottom: (viewport_height>500 && viewport_height<800) ? -27 : -3}}>
            {!isEnemy &&
                <div className={'h-auto col-2 mb-2'}>
                    { myTurn &&
                        <form onSubmit={onSubmit} style={{background:"#295f48"}}>
                            {children}
                        </form>
                    }
                </div>}
            <CardContainer Enemy={isEnemy}>
                <strong className={isEnemy ? ('mt-1 mt-md-2 ' + (!myTurn && 'text-info')) : ('mt-3 mt-sm-0 ' + (myTurn && 'text-info'))}
                        style={{fontSize:17}}>
                    {isEnemy ? 'Enemy ' : ''} Cards Remaining : {myCards ? myCards.length : enemyCards.length}
                </strong>
            </CardContainer>
        </div>
    )
}
