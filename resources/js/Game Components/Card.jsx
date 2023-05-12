import '../../css/GameCss/CardCss.css';
import { useContext, useState } from "react";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {HeightContext} from "../Contexts/HeightContext";
import {TurnContext} from "../Contexts/TurnContext";

export default function Card({cardObject,Enemy,Stacked,color,isPagination,card,handleClick,className}) {
    const cardObj = cardObject,
    isEnemy = Enemy,
    isStacked = Stacked,
    { selectedCards,setSelectedCards } = !isEnemy && useContext(SelectedCardsContext),
    [selected,setSelected] = (!isEnemy && !isStacked) ? useState(selectedCards.includes(cardObj)) : '',
    {myTurn,setMyTurn} = useContext(TurnContext)    ,
    cardColor = isEnemy ? 'black' : color,
    handleClickCard = setSelectedCards,height = useContext(HeightContext),
    FontSize = (height < 500) ? 70 : 160,
    Width = (height < 500) ? 52 : 120,
    Height = (height < 500) ? 85 : 'auto';
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
    }
    const select = ()=>{
        !isEnemy && !isStacked && myTurn && addToSelected();
    },
    Card = isPagination ?
        <>
            <p className={'text-info fw-bold p-0 my-0'}>More cards</p>
            <div className={'cardContainer ' + className} style={{backgroundColor:"white",fontSize:FontSize,width:Width,height:Height}}
                 onClick={handleClick}>
                {card}
            </div>
        </>
        :
        <div className={'cardContainer'}
          style={selected ? {backgroundColor:'lightblue',color:cardColor,fontSize:FontSize,width:Width,height:Height}
              : {backgroundColor:"white" ,color:cardColor,fontSize:FontSize,width:Width,height:Height}}
          onClick={select}>
            {card}
        </div>;
    return (
        <>
            {Card}
        </>
    )
}
