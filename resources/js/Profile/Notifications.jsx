import {useState} from "react";

export function Notifications(props) {
    const [notifications,setNotifications] = useState(props.Notifications),
    NotificationList = notifications.map((Notification)=>   {
        return  <li className={"list-group-item text-" + Notification.Color}>
            {/*{Notification.Priority >}*/}
            {Notification.Text}
        </li>
    });

    return (
        <div className={'row'}>
            <div className={'col-12'}>
                <ul className="list-group list-group-flush">

                </ul>
            </div>
        </div>
    )
}
