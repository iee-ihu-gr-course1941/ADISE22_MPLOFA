import {Pagination} from "./Pagination";
import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Link} from "@inertiajs/inertia-react";
import {UserBox} from "./UserBox";
import uuid from "react-uuid";

export function Users({Users,IEEs}) {
    const
        [showingIEES,setShowingIEES] = useState(false),
    UserList = Users.data.length > 0 ? Users.data.map((User)=>{
        return <li  key={User.email} className="list-group-item d-flex justify-content-between align-items-start pb-0 pt-2">
            <UserBox User={User}></UserBox>
        </li>
    }) : <li key={'none'} className="list-group-item">{showingIEES ? "There are no registered IEE's." : 'No Users have signed up.'}</li>;

    return (
        <div className={'card h-50 mt-md-5 mt-4 mt-sm-5 mt-lg-0'}>
            <div className={'card-header text-center'}>
                <h5>Users</h5>
                <Link href={route('AdminPanel')}  as={'button'} only={['Users']} name="IEES" data={{iees:!showingIEES}}
                             className={"badge bg-success rounded-pill"} type="button" preserveState={true} preserveScroll={true}
                      onClick={()=>{setShowingIEES(!showingIEES)}}>
                IEE's : {IEEs}
            </Link>
            </div>
            <div className={'card-body'} style={{overflowX:'hidden',overflowY:'auto'}}>
                <ul className="list-group list-group-flush text-center">
                    {UserList}
                </ul>
            </div>
            <div className={'card-footer bg-transparent pt-3 pb-0 px-0'}>
                <Pagination links={Users} className={''}></Pagination>
            </div>
        </div>
    )
}
