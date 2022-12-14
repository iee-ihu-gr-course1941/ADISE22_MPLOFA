import '../../css/GameCss/CardCss.css';
import { useContext, useState } from "react";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";

export default function Card({cardObject,Enemy,Stacked,color,isPagination,card,handleClick}) {
    const cardObj = cardObject,
    isEnemy = Enemy,
    isStacked = Stacked,
    { selectedCards,setSelectedCards } = !isEnemy && useContext(SelectedCardsContext),
    [selected,setSelected] = (!isEnemy && !isStacked) ? useState(selectedCards.includes(cardObj)) : '',
    cardColor = isEnemy ? 'black' : color,
    handleClickCard = setSelectedCards;

    function addToSelected() {
        if(!selected) {
            handleClickCard(prevSelected => {
                return [...prevSelected,cardObj];
            });
        }
        else {
            handleClickCard(prevSelected => {
                return prevSelected.filter((prevItem) => prevItem !== cardObj);
            });
        }
        setSelected(!selected);
        console.log(selectedCards);
    }
    const select = ()=>{
        !isEnemy && !isStacked && addToSelected();
    },
    isPaginationBool = isPagination,
    Card = isPaginationBool ? <div className={'cardContainer'} style={{backgroundColor:"white"}} onClick={handleClick}>
        {card}
    </div> : <div className={'cardContainer'}
          style={selected ? {backgroundColor:'lightblue',color:cardColor} : {backgroundColor:"white" ,color:cardColor}}
          onClick={select}>
        {card}
    </div>;
    return (
        <>
            {Card}
        </>
    )
}
