import Player from "../../Game Components/Player";
import CardStack from "../../Game Components/CardStack";
import {useEffect, useState} from "react";
import {Link, useForm} from "@inertiajs/inertia-react";
import {CardsContext} from "../../Contexts/CardsContext";
import {TurnContext} from "../../Contexts/TurnContext";
import {NextPlayerContext} from "../../Contexts/NextPlayerContext";
import {SelectedCardsContext} from "../../Contexts/SelectedCardsContext";
import {StackContext} from "../../Contexts/StackContext";
import {Inertia} from "@inertiajs/inertia";
import {CardsPlayedContext} from "../../Contexts/CardsPlayedContext";
import {UserContext} from "../../Contexts/UserContext";
import {HeightContext} from "../../Contexts/HeightContext";
import {PreviousMoveContext} from "../../Contexts/PreviousMoveContext";
import {WidthContext} from "../../Contexts/WidthContext";

export default function GameCanvas(props) {
    document.title = 'Game in Session';
    // console.log(props)
    const Players = props.GameObject && JSON.parse(props.GameObject.players),
        OwnerHasRendered = props.GameObject.OwnerCanvasRendered,
        PlayerHasRendered = props.GameObject.PlayerCanvasRendered,
    User = props.auth.user,
        Room = props.Room,
    // [Players,setPlayers] = useState(props.Players),
    [Game,setGame] = useState(props.Game ? props.Game : null),
    nextPlayer = props.Game.next_player,
    // [myCards,setMyCards] = useState(props.Game.player_cards.player1.cards),
    myCards = props.Game.player_cards.player1.cards,
    // [enemyCards,setEnemyCards] = useState(Array(props.Game.player_cards.player2.count).fill('Empty')),
    enemyCards = Array(props.Game.player_cards.player2.count).fill('Empty'),
    // [cardsInStack,setCardsInStack] = useState(props.Game ? Array(props.Game.cards_down).fill('Empty') : []),
    cardsInStack = props.Game ? Array(props.Game.cards_down).fill('Empty') : [],
    [selectedCards,setSelectedCards] = useState([]),
    [myTurn,setMyTurn]=useState(props.Game ? props.Game.next_player.id === User.id : false),
    [asSelected,setAsSelected] = useState(false),
    // [cardsPlayed,setCardsPlayed] = useState(props.Game.cards_played),
    cardsPlayed = props.Game.cards_played,
    [viewport_height,setViewport_Height] = useState(window.innerHeight),
    [viewport_width,setViewport_Width] = useState(window.innerWidth),
    previousMove = props.Game.previous_move,
    buttonSize = (viewport_height < 500) ? 'btn-sm ' : '',
    buttonWidth = (viewport_height < 500) ? ' w-auto' : ' w-100',
    passMargin = (viewport_height < 500 && viewport_height > 400) ? ' me-1' : ' mb-2';
    const { data, setData, post,get, processing, errors, reset } = useForm({
        user_id: User.id,
        game_id: Game ? Game.game_id : null,
        status : '',
        cards_played : {'cards_played':'','as':{'count':'','number':''}},
        game_status:1,
    });
    // console.log(Game)
    const MINUTE_MS = 4000;
    window.addEventListener('beforeunload', ()=> {
        handleLeave();
    });
    useEffect(()=>{
        selectedCards.length === 0 && setAsSelected(false);
    },[selectedCards])

    useEffect(() => {
        function handleResize() {
            setViewport_Height(window.innerHeight);
            setViewport_Width(window.innerWidth);
            // console.log("handled resize");
        }

        window.addEventListener('resize', handleResize)
    });

    // useEffect(() => {
    //     console.log("handling leave");
    //
    // }, []);

    useEffect(() => {
        const interval = !myTurn && setInterval(() => {
            // console.log("Interval")
            if(!myTurn && !document.getElementById('leaveWindow').classList.contains('show')) {
                Inertia.get(route('Check_Enemy_Move'),{GameId:props.Game.game_id},{
                    preserveScroll:true,
                    // preserveState:true,
                    onSuccess:
                        (res)=> {
                            if(!res.props.GameObject.winner && Game.sequence_number !== res.props.Game.sequence_number) {
                                res.props.Game && setNewState(res.props.Game);
                                res.props.Game && clearInterval(interval);
                                res.props.Game && setMyTurn(true);
                            }
                            else if(res.props.GameObject.winner) {
                                Inertia.get(route('Winner'),{game_id:data.game_id});
                            }
                        }
                });
            }
        }, MINUTE_MS);

        return () => clearInterval(interval);
    });



    function handlePlay() {
        data.status=1;
        if(asSelected)
            Inertia.post(route('Make_Move'),data,
         {only:['Game','GameObject'],preserveScroll:true,
                onSuccess:(res)=> {
                    if(!res.props.GameObject.winner) {
                        setNewState(res.props.Game);
                        reset('cards_played','status');
                    }
                    else {
                        Inertia.get(route('Winner'),{game_id:data.game_id});
                    }
                }});
    }

    function handleBluff() {
        data.status=2;
        // setSelectedCards([]);
        data.cards_played = [];
        Inertia.post(route('Make_Move'),data,
            {only:['Game','GameObject'],preserveScroll:true,
                onSuccess:(res)=>   {
                    if(!res.props.GameObject.winner) {
                        setNewState(res.props.Game);
                        reset('cards_played','status');
                    }
                    else {
                        Inertia.get(route('Winner'),{game_id:data.game_id});
                    }
            }});
    }

    function handlePass() {
        data.status=3;
        // setSelectedCards([]);
        data.cards_played = [];
        Inertia.post(route('Make_Move'),data,
            {only:['Game','GameObject'],preserveScroll:true,
                onSuccess:(res)=>   {
                    if(!res.props.GameObject.winner){
                        setNewState(res.props.Game);
                        reset('cards_played','status');
                    }
                    else {
                        Inertia.get(route('Winner'),{game_id:data.game_id});
                    }
            }});
    }
    function handleLeave() {
        data.status=4;
        data.game_status = 3;
        data.cards_played = [];
    }

    function setNewState(NewState) {
        setGame(NewState);
        setMyTurn(false);
    }
    function handleAs(e) {
            data.cards_played.cards_played = selectedCards;
            data.cards_played.as.count = selectedCards.length;
            data.cards_played.as.number = e.target.value;
            setAsSelected(true);
    }

    function submit(e) {
        e.preventDefault();
        setSelectedCards([]);
    }

    return (
        <HeightContext.Provider value={viewport_height}>
            <WidthContext.Provider value={viewport_width}>
                <div className='container-fluid vh-100 w-100 position-relative pt-1 overflow-scroll' style={{background:"#295f48"}}>
                    <div className='row h-100 p-0 mx-0'>
                        <div className='col-12 px-0'>
                            <div className='card h-100 border-0' style={{background:"#295f48"}}>
                                <div className='card-body p-0 text-center' style={{background:"#295f48"}}>
                                    <SelectedCardsContext.Provider value={{selectedCards,setSelectedCards}}>
                                        <TurnContext.Provider value={{myTurn,setMyTurn}}>
                                            <CardsContext.Provider value={{enemyCards}}>
                                                <Player Position='Top' Enemy={true}></Player>
                                            </CardsContext.Provider>
                                            <PreviousMoveContext.Provider value={previousMove}>
                                                <CardsPlayedContext.Provider value={cardsPlayed}>
                                                    <UserContext.Provider value={User}>
                                                        <NextPlayerContext.Provider value={nextPlayer}>
                                                            <CardStack cardStack={cardsInStack} selected={selectedCards} handleAs={handleAs}>
                                                                <button
                                                                    className="btn btn-danger text-center mt-3 btn-sm" type="button"
                                                                    data-bs-toggle="modal" data-bs-target="#leaveWindow">
                                                                    Leave Game
                                                                </button>
                                                            </CardStack>
                                                        </NextPlayerContext.Provider>
                                                    </UserContext.Provider>
                                                </CardsPlayedContext.Provider>
                                            </PreviousMoveContext.Provider>
                                            <CardsContext.Provider value={{myCards}}>
                                                <StackContext.Provider value={cardsInStack.length}>
                                                    <Player Position='Bottom' Enemy={false} onSubmit={submit} reset={reset}>
                                                        { selectedCards.length!==0 ?
                                                            <>
                                                                { asSelected === false && <p className={'text-danger my-0'}
                                                                 style={{fontSize:(viewport_height < 450 ? 13 : 20)}}>
                                                                    {'Declare your card' +
                                                                    (selectedCards.length>1 ? 's !':' !')}</p>}
                                                                <button className={'btn btn-info w-auto mx-3 mt-1 mb-2'} onClick={handlePlay} style={{borderRadius:20}}
                                                                disabled={asSelected === false}>{selectedCards.length  > 1 ? 'Play Cards' : 'Play Card'}</button>
                                                            </>
                                                            :
                                                            <>
                                                                {cardsInStack.length === 0  && <h6>Play at least 1 card.</h6>}
                                                                <button className={'btn btn-danger mb-2 w-100 ' + (viewport_height < 420 && ' me-2')}  style={{borderRadius:20}}
                                                                    onClick={handlePass} disabled={cardsInStack.length === 0}>Pass</button>
                                                                <button className={'btn btn-warning mb-2  mb-xl-0 w-100'  } style={{borderRadius:20}}
                                                                    onClick={handleBluff} disabled={cardsInStack.length === 0 || (previousMove && previousMove.Status === 3)}>Call Bluff</button>
                                                            </>}
                                                    </Player>
                                                </StackContext.Provider>
                                            </CardsContext.Provider>
                                        </TurnContext.Provider>
                                    </SelectedCardsContext.Provider>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" data-bs-backdrop="static" id="leaveWindow" tabIndex="-1" aria-labelledby="leaveWindowLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Leave Game</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to leave the Game?
                                    </div>
                                    <div className="modal-footer text-center justify-content-center">
                                        <button type="button" className="btn btn-outline-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        {/*<form onSubmit={submit}>*/}
                                        {/*    <button data-bs-dismiss="modal" className={'btn btn-danger'} onClick={handleLeave}>Leave Game</button>*/}
                                        {/*</form>*/}
                                        <Link href={route('Make_Move')} method={'post'} data={data} as={'button'} onClick={handleLeave}
                                              className="btn btn-outline-danger" type="button" data-bs-dismiss="modal">
                                            Leave Room
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className='col-1 p-5' style={{background:"ghostwhite"}}>*/}
                        {/*    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"*/}
                        {/*            data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">*/}
                        {/*        Toggle*/}
                        {/*    </button>*/}
                        {/*    /!*{*!/*/}
                        {/*    /!*    Room.Game_Active &&*!/*/}
                        {/*    /!*<ScoreBoard Players={Players}>*!/*/}

                        {/*    /!*</ScoreBoard>}*!/*/}
                        {/*</div>*/}
                    </div>
                </div>
            </WidthContext.Provider>
        </HeightContext.Provider>
    )
}
