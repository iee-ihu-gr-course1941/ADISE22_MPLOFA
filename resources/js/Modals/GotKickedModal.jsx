import {useState} from "react";
import {Button, Modal} from "react-bootstrap";

export function GotKickedModal({state,report}) {
    const {kicked,setKicked} = state,[show, setShow] = useState(kicked),
        handleClose = () => {
            setShow(false);
            setKicked(false);
        };
    return (
        <>
            <Modal show={kicked} onHide={handleClose} className={'text-center my-5'}>
                <Modal.Header closeButton>
                    <Modal.Title>Kick Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className={'my-2 text-center fst-italic'}>
                        You were kicked from the Room {report.kicked_from.Name}.
                    </p>
                    <h4 className={'my-2 text-center'}>The reason was</h4>
                    <h5 className={'my-2 text-danger text-center'}>{report.reason}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className={'mx-auto'} onClick={handleClose}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
