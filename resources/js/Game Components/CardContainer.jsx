import Card from "./Card";
import styled from "styled-components";
import {useContext, useEffect, useMemo, useState} from "react";
import {Pagination} from "../Components/Pagination";
import uuid from "react-uuid";
import {CardsContext} from "../Contexts/CardsContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";
import {HeightContext} from "../Contexts/HeightContext";
import {WidthContext} from "../Contexts/WidthContext";

export const Hand = styled.div`
  justify-items:center;
  display:  grid;
  // grid-gap: 0.5rem;
  grid-template-columns: repeat(10, 45px);
  transition: grid-template-columns 0.5s;
  position:relative;
  grid-column-start:4;
  // margin-left:12%;
  padding-left:150px;
  // color:red;
`;

export const MobileHand = styled.div`
  justify-items:center;
  display:  grid;
  // grid-gap: 0.5rem;
  grid-template-columns: repeat(7, 45px);
  transition: grid-template-columns 0.5s;
  position:relative;
  grid-column-start:4;
  padding-left:25px;
`;

export default function CardContainer({Enemy,children}) {
    const { compare } = Intl.Collator('en-US'),
    {myCards}  = useContext(CardsContext),
    { enemyCards , setEnemyCards } = useContext(CardsContext),
    { selectedCards, onSelectCard } = !Enemy && useContext(SelectedCardsContext),
    sortedCards = myCards ? myCards.sort((a, b) => compare(a.id, b.id)) : enemyCards.sort((a, b) => compare(a.id, b.id)),
    [changed,setChanged] = useState(false),
    height = useContext(HeightContext),
        width = useContext(WidthContext),
        [currentPage, setCurrentPage] = useState(1),
        [pageSize,setPageSize] = useState((height > 500) ? 10 : 7),
        [totalCount, setTotalCount] = useState(myCards ? myCards.length : enemyCards.length),
     currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return sortedCards.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]),
    pagination = Enemy ? '' :  <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}/>,
    stackSize = useContext(StackContext),
    IsEnemy = Enemy,
    mobileEnemyCardsPadding = IsEnemy ? ' me-5 pe-5 ' : '',
    paginationPadding = (height < 500) ? ' ms-5 ms-md-1 mb-3' : '  ms-5 ms-md-1';
    let cardsPadding;
    if (window.innerWidth>1000 && window.innerWidth <1100)  {
        cardsPadding =  120;
    }
    else if (window.innerWidth > 1100) {
        cardsPadding =  150;
    }
    else {
        cardsPadding =  0;
    }


    useEffect(()=> {
        setChanged(!changed);
        setCurrentPage(2);
    },[myCards ? myCards : enemyCards]);

    useEffect(()=> {
        setCurrentPage(1);
    },[changed]);

    useEffect(() => {
        function handleResize() {
            setPageSize((height > 500) ? 10 : 7);
        }

        window.addEventListener('resize', handleResize)
    });

    const CardMap = new Map([
        // Spades
        [1, "🂡"], [2, "🂢"], [3, "🂣"], [4, "🂤"], [5, "🂥"], [6, "🂦"], [7, "🂧"], [8, "🂨"], [9, "🂩"], [10, "🂪"], [11, "🂫"],
        [12, "🂭"], [13, "🂮"],
        // Hearts
        [14, "🂱"], [15, "🂲"], [16, "🂳"], [17, "🂴"], [18, "🂵"], [19, "🂶"], [20, "🂷"], [21, "🂸"], [22, "🂹"], [23, "🂺"],
        [24, "🂻"], [25, "🂽"], [26, "🂾"],
        // Diamonds
        [27, "🃁"], [28, "🃂"], [29, "🃃"], [30, "🃄"], [31, "🃅"], [32, "🃆"], [33, "🃇"], [34, "🃈"], [35, "🃉"], [36, "🃊"],
        [37, "🃋"], [38, "🃍"], [39, "🃎"],
        // Clubs
        [40, "🃑"], [41, "🃒"], [42, "🃓"], [43, "🃔"], [44, "🃕"], [45, "🃖"], [46, "🃗"], [47, "🃘"], [48, "🃙"], [49, "🃚"],
        [50, "🃛"], [51, "🃝"], [52, "🃞"],

        [53, "🂠"]
    ]);
    const Cards = currentTableData.map((card)=> {
        if(card==='Empty')
            return <Card key={uuid()} card={CardMap.get(53)} size={'1'} Enemy={Enemy}
                         color={card.color} cardId={card.id}></Card>;
        else
            return <Card cardObject={card} key={card.id} card={IsEnemy ? CardMap.get(53): CardMap.get(card.id)} size={'1'} Enemy={Enemy}
            color={card.color} cardId={card.id} handleClick={onSelectCard} selectedCards={selectedCards}></Card>;
    });
    return (
        <>
            <div className={(IsEnemy ? 'col-6 col-md-6 col-lg-7 col-xxl-5 ps-xxl-5 ms-5 ms-xl-0' : 'col-6 col-md-6 col-lg-8 col-xxl-5 mb-3 ') + mobileEnemyCardsPadding} style={{fontSize:'125'}}>
                {children}
                {
                    ( height > 500)
                        ?
                    <Hand style={{paddingLeft: cardsPadding}}>
                        {Cards}
                    </Hand>
                        :
                    <MobileHand>
                        {Cards}
                    </MobileHand>
                }
            </div>
            {
                !IsEnemy &&  <div className={'col-2 col-md-2 col-lg-1 col-xxl-2 text-center ' + paginationPadding}>
                    {pagination}
                </div>
            }
        </>
    )
}
