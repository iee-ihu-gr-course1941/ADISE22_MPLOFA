import {Link} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {DeleteUserModal} from "../Modals/DeleteUserModal";

export function UserBox({User}) {
    return (
        <>
            {User.isIEE && <span className="badge bg-success rounded-pill">IEE</span>}
            <div className="mx-auto">
                <div className="fw-bold border-bottom border-1 pb-1">
                    {User.name}
                </div>
                <div className={'row pb-0 pt-2'}>
                    <div className={'col-12  px-1'}>
                        <strong>Joined</strong>
                        <p>{User.joined}</p>
                        <p className={'fw-bold'}>Ref : {User.refUser ? User.refUser.name : 'None'}</p>
                        <DeleteUserModal User={User}></DeleteUserModal>
                    </div>
                </div>
            </div>
            <span className="badge bg-primary rounded-pill">{User.points}</span>
        </>
    )
}
