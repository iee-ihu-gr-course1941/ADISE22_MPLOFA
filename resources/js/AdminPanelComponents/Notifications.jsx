export function Notifications({Notifications}) {
    // const UserList = Users.map((User)=>{
    //     return <li key={User.id} className="list-group-item d-flex justify-content-between align-items-start pb-0 pt-2">
    //         <div className="ms-2 me-auto">
    //             <div className="fw-bold border-bottom border-1 pb-1">
    //                 {User.name}
    //             </div>
    //             <div className={'row pb-0 pt-2'}>
    //                 <div className={'col-12 col-md-6 col-lg-8 px-1'}>
    //                     <strong>Email</strong>
    //                     <p>{User.email}</p>
    //                 </div>
    //                 <div className={'col-12 col-md-6 col-lg-4 px-1'}>
    //                     <strong>Joined</strong>
    //                     <p>{User.joined}</p>
    //                 </div>
    //             </div>
    //
    //         </div>
    //         <span className="badge bg-primary rounded-pill">{User.points}</span>
    //     </li>
    // });
    console.log(Users)
    return (
        <div className={'card h-50 '}>
            <div className={'card-header text-center'}>
                <h5>Users</h5>
            </div>
            <div className={'card-body overflow-scroll'}>
                <ul className="list-group list-group-flush text-center">
                    {Users ? UserList : <li className="list-group-item">No Users have signed up</li>}
                </ul>
            </div>
        </div>
    )
}
