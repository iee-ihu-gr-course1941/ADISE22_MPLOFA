import {Link} from "@inertiajs/inertia-react";
import {Pagination} from "./Pagination";
import StarRating from "../Components/StarRating";
import {BugBox} from "./BugBox";

export function Bugs({Bugs}) {
    const BugList = Bugs.data.map((Bug)=>{
        return <li key={Bug.id} className="list-group-item d-flex justify-content-between align-items-start pb-2 pt-2 w-100">
            <BugBox Bug={Bug}></BugBox>
        </li>
    });
    return (
        <div className={'text-center mt-md-0 mt-sm-4 mt-lg-0 mt-4 h-75'}>
            <div className={'card '}>
                <div className={'card-header text-center'}>
                    <h5>Bugs</h5>
                    {/*<div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">*/}
                    {/*</div>*/}
                </div>
                <div className={'card-body overflow-auto h-50'}>
                    <ul className="list-group list-group-flush text-center align-items-center">
                        {
                            Bugs.data.length !==0
                                ?
                                BugList
                                :
                                <li className={'list-group-item'}>No Bugs have been submitted yet!</li>
                        }
                    </ul>

                </div>
                <div className={'card-footer bg-transparent pt-3 pb-0 px-0'}>
                    <Pagination links={Bugs} className={''}></Pagination>
                </div>
            </div>
        </div>
    )
}
