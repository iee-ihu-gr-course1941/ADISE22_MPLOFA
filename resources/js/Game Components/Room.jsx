import {Link} from "@inertiajs/inertia-react";
import {UserContext} from "../Contexts/UserContext";
import {useContext, useState} from "react";
import {RoomPasswordModal} from "../Modals/RoomPasswordModal";
import {Inertia} from "@inertiajs/inertia";

export function Room({Room,children}) {
    const User = useContext(UserContext),
    [enterPassword,setEnterPassword] = useState(false);
    return (
        <div className="carousel-item active p-4 w-100">
            <div className='card border-0 p-3 shadow h-100 my-3 w-75 mx-auto'>
                <div className='card-title p-1 text-center row'>
                    {enterPassword === true &&
                        <div className={'col col-lg-1 mb-xs-0 mb-4'}>
                            <button className={'btn btn-outline-info'} onClick={()=>{setEnterPassword(false)}} style={{cursor:'pointer'}}>
                                Back
                            </button>
                        </div>
                    }
                    <div className={enterPassword === false ? 'col-12 ' : 'col-lg-10 col-12'}>
                            <h5>
                                {Room.Name}
                            </h5>
                            <p className={'text-sm text-info'}>Created :
                                {Room.Created.Days > 0 && Room.Created.Days} {Room.Created.Days > 0 && (Room.Created.Days !== 1 ? ' Days ' : ' Day ')}
                                {Room.Created.Hours > 0 && Room.Created.Hours } { Room.Created.Hours > 0 &&(Room.Created.Hours !== 1 ? ' Hours ' : ' Hour ')}
                                {Room.Created.Minutes > 0 && Room.Created.Minutes } {Room.Created.Minutes > 0 && (Room.Created.Minutes !== 1 ? ' Minutes ' : ' Minute ')}
                                {Room.Created.Seconds > 0 && Room.Created.Seconds } {Room.Created.Seconds > 0 && (Room.Created.Seconds !== 1 ? ' Seconds ' : ' Second ')}
                                ago.</p>
                            {User.ca
                                &&
                                <Link href={route('Delete_Room')} method={'delete'} data={{room_id:Room.id}} as={'button'}
                                className="btn btn-danger text-center" type="button" only={['Rooms']}
                                onSuccess={()=>{Inertia.get(route('home'),{},{only:['Rooms']});}} disabled={!User.ca}>
                                    Delete
                                </Link>
                            }
                    </div>
                </div>
                <div className='card-body'>
                    <div className="row text-center gx-0">
                        {!enterPassword &&
                            <div className='col-12'>{Room.Owner && Room.Player ?
                                <div className={'col-3 mx-auto'}>
                                    <img src={"/Images/social-group.png"} alt={"Players"}>
                                    </img>
                                </div>
                                :
                                <div className={'col-3 mx-auto'}>
                                    <img className={'me-2'} src={"/Images/UserIcon.png"} width={25} alt={"Players"}></img>
                                </div>}
                                <div className={'col-9 text-center mx-auto mt-3'}>
                                    <h5>{Room.Owner && Room.Owner.name}</h5>
                                    <div><h5>{Room.Player && Room.Player.name}</h5></div>
                                </div>
                            </div>
                        }
                        <div className="row justify-items-center justify-content-lg-center gx-0 mx-auto">
                            {
                                Room.HasPassword ?
                                    <>
                                        { !enterPassword && <button type="button" className="btn btn-success text-center mt-4 w-50 mx-auto"
                                                 disabled={(Room.Owner && Room.Player) ||
                                                 ((Room.Owner && Room.Owner.id === User.id) ||
                                                 (Room.Player && Room.Player.id === User.id))} onClick={() => {setEnterPassword(true)}}>
                                            Join
                                        </button>}
                                        {
                                           (enterPassword === true) &&
                                            <RoomPasswordModal Room={Room} User={User}>

                                            </RoomPasswordModal>
                                        }
                                    </>
                                    :
                                    <Link href={route('Join_Room')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                          className="btn btn-success text-center mt-4 w-50 mx-auto" type="button"
                                          disabled={(Room.Owner && Room.Player) ||
                                              ((Room.Owner && Room.Owner.id === User.id) ||
                                                  (Room.Player && Room.Player.id === User.id)) || enterPassword}>
                                        Join
                                    </Link>
                            }
                            {(Room.HasPassword && !enterPassword )&& <strong className={'p-2'}>Requires password to join!</strong>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
