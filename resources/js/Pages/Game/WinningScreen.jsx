import {Link} from "@inertiajs/inertia-react";
import {useEffect, useState} from "react";
import StarRating from "../../Components/StarRating";

export default function WinningScreen(props) {
    const [Game,setGame] = useState(props.Game),
        Winner = props.Winner,
        Player1 = props.Player1,
        Player2 = props.Player2,
        has_fled = props.has_fled,
        User = props.auth.user,
        data = {
                user_id: User.id,
                bug_text : '',
                bug_found_at : '',
            },[viewport_height,setViewport_Height] = useState(window.innerHeight),
    Height = (viewport_height < 800) ? 'h-100' : 'vh-100';

    useEffect(() => {
        function handleResize() {
            setViewport_Height(window.innerHeight);
        }

        window.addEventListener('resize', handleResize)
    });
    document.title = Winner.id === User.id ? 'Victory' : 'Defeat';

    return(
        <div className={'container-fluid vw-100 position-relative py-2 pt-sm-3 px-3 px-sm-5 overflow-scroll ' + Height} style={{background:"#EEEEEE"}}>
            <div className='row p-0 mx-0 align-items-center text-center h-75 justify-content-center'>
                <div className={'row vw-100'}>
                    {Winner.id === User.id ? <h1 className={'text-success'}>You WIN</h1> : <h1 className={'text-danger'}>You Lose</h1>}
                </div>
                <div className={'row px-0 my-0 gx-0'}>
                    <div className='col-12 col-sm-4 text-center align-items-center my-3 order-0'>
                        <div className='card border-1 p-2 h-100 shadow-lg' style={{background:"#e6e6e6"}}>
                            <div className='card-title p-1 text-center mt-5'><h4>{Player1.name}</h4></div>
                            <div className='card-body'>
                                <div className={'row'}>
                                    {
                                        (has_fled && has_fled === Player1.id) ? <h4 className={'text-danger'}>Left the Game</h4> :
                                        (Winner.id === Player1.id ?
                                            <h4 className={'text-success'}>
                                                Victory
                                            </h4>
                                            :
                                            <h4 className={'text-danger'}>
                                                Defeat
                                            </h4>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-sm-4 text-center h-auto align-items-center order-2 order-sm-1 p-3'}>
                        <StarRating onSetRating={(rating)=>{data.rating = rating;console.log(data)}} className={'my-auto'} User={User}>
                        </StarRating>
                    </div>
                    <div className='col-12 col-sm-4 text-center align-items-center my-3 order-1 order-sm-2'>
                        <div className='card border-1 p-2 h-100 shadow-lg' style={{background:"#e6e6e6"}}>
                            <div className='card-title p-1 text-center mt-5'><h4>{Player2.name}</h4></div>
                            <div className='card-body'>
                                <div className={'row'}>
                                    {
                                        (has_fled && has_fled === Player2.id) ? <h4 className={'text-danger'}>Left the Game</h4> :
                                        (Winner.id === Player2.id ?
                                            <h4 className={'text-success'}>
                                                Victory
                                            </h4>
                                            :
                                            <h4 className={'text-danger'}>
                                                Defeat
                                            </h4>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href={route('home')} method={'get'} as={'button'}
                      className={"btn btn-outline-danger mt-4 w-auto" } type="button" onSuccess={()=>{}}>
                    Leave Game
                </Link>
            </div>
        </div>
    )
}
