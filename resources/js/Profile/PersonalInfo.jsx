import {useState} from "react";
import {Offcanvas} from "react-bootstrap";
import {InviteFriends} from "../Modals/InviteFriends";
import {EditPersonalInfo} from "../Modals/EditPersonalInfo";

export function PersonalInfo(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-outline-primary text-center ms-0 ms-xl-5" type="button" onClick={handleShow}>
                My Profile
            </button>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h3 className="offcanvas-title" id="PersonalInfo">My Profile</h3>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditPersonalInfo></EditPersonalInfo>
                    <InviteFriends></InviteFriends>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
