import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Link} from "@inertiajs/inertia-react";

export function KickPlayerModal({User,Room}) {
    const [show, setShow] = useState(false),
        handleClose = () => setShow(false),
        handleShow = () => setShow(true),
    [reason,setReason] = useState('');
    return (
        <>
            <Button variant="outline-danger" onClick={handleShow} className={'text-center btn-sm my-2 w-auto'}>
                Kick {User.name}
            </Button>
            <Modal show={show} onHide={handleClose} className={'text-center'}>
                <Modal.Header closeButton>
                    <Modal.Title>Kick {User.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={'fst-italic'}>Are you sure you want to kick <strong className={'text-info'}>{User.name}</strong> ?</p>
                    <select className="form-select text-center" aria-label="Reason selection" required={true}
                    onChange={(e)=>{setReason(e.target.value)}} defaultValue={'default'}>
                        <option value='default' hidden={true}>Please Select a reason! *</option>
                        <option value="Inactivity">Inactivity</option>
                        <option value="Language">Language</option>
                        <option value="Just got a friend incoming, no hard feelings.">
                            Just got a friend incoming, no hard feelings.
                        </option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Link href={route('Room_Kick_Player')} className={'btn btn-danger my-2'} as={'button'} method={'patch'}
                          data={{player_to_kick_id:Room.Player.id,room_id:Room.id,reason_to_kick:reason}}
                          disabled={reason === ''}
                          onClick={handleClose}>
                        Kick
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}
