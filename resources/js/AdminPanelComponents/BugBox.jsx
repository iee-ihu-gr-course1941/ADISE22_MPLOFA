import {Link} from "@inertiajs/inertia-react";

export function BugBox({Bug}) {
    return (
        <div className={'card w-100'}>
            <div className={'card-header border-bottom-0 bg-transparent'}>
                <div className={'row w-100 mx-0'}>
                    <div className={'col-12 col-sm-8'}>
                        <div className="fw-bold">
                            {Bug.user.name}
                        </div>
                    </div>
                    <div className={'col-12 col-sm-4'}>
                        {
                            Bug.resolved ?
                                <div className={'row w-100 text-center mx-0'}>
                                    <div className={'col-12 col-md-4 '}>
                                        <Link href={route('Resolve_Bug')} method={'post'} data={{BugID:Bug.id}} as={'button'}
                                              className="btn px-0" type="button" preserveScroll={true}>
                                            <img src={'Images/accept.png'} style={{width:30,height:30}} alt={'Resolved'}></img>
                                        </Link>
                                    </div>
                                    <div className={'col-12 col-md-8 px-0'}>
                                        <p className={'py-2 fw-bold'}>Resolved</p>
                                    </div>
                                </div>
                                :
                                <div className={'row w-100 mx-0'}>
                                    <div className={'col-12 col-md-4 px-0'}>
                                        <Link href={route('Resolve_Bug')} method={'post'} data={{BugID:Bug.id}} as={'button'}
                                              className="btn px-0" type="button" preserveScroll={true}>
                                            <img src={'Images/remove.png'} style={{width:30,height:30}} alt={'Unresolved'}></img>
                                        </Link>
                                    </div>
                                    <div className={'col-12 col-md-8 px-0'}>
                                        <p className={'py-2 fw-bold'}>Unresolved</p>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className={'card-body text-center'}>
                <div className={'row w-100'}>
                    <div className={'col-12 col-xl-2'}>
                        <div className="ms-2 me-auto">
                            <div className={'row pb-0 pt-2 mx-0'}>
                                {/*<div className={'col-12'}>*/}
                                <strong>Device</strong>
                                <p>{Bug.encountered_at}</p>
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-xl-10 text-center ps-4 pe-0'}>
                        <strong>Description</strong>
                        <p className={'text-center h-75'} style={{overflowY:"scroll"}}>{Bug.description}</p>
                    </div>
                </div>
            </div>
            <div className={'card-footer bg-transparent'}>
                <strong>Placed</strong>
                <p className={'mb-0'}>{Bug.placed}</p>
            </div>
        </div>
    )
}
