import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Link} from "@inertiajs/inertia-react";

export function DeleteUserModal({User}) {
    const [show, setShow] = useState(false),
    handleClose = () => setShow(false),
    handleShow = () => setShow(true);
    return (
        <>
            <Button variant="outline-danger" onClick={handleShow} className={'text-center btn-sm my-2'} disabled={User.ca}>
                Delete User
            </Button>
            <Modal show={show} onHide={handleClose} className={'text-center'}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {User.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <strong>User ID</strong>
                <p>{User.id}</p>
                <strong>Full Name</strong>
                <p>{User.name}</p>
                <strong>Email</strong>
                <p>{User.email}</p>
                <strong>Points</strong>
                <p>{User.points}</p>
                <strong>Joined</strong>
                <p>{User.joined}</p>
                <p className={'fw-bold'}>Reference : {User.refUser ? User.refUser.name : 'None'}</p>
                <p className={'fst-italic'}>Are you sure you want to delete {User.name} ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Link href={route('User.Delete')} method={'delete'}
                      data={{userID:User.id}} as={'button'} className="btn btn-danger text-center my-2" type="button"
                       disabled={User.ca}>
                    Delete User
                </Link>
            </Modal.Footer>
        </Modal>
        </>
    )
}
