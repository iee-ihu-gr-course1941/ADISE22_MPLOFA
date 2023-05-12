import React, {useEffect, useRef, useState} from 'react';

import '../../../css/Login._Register.css';
import Register from "./Register";
import Login from "./Login";
import Overlay from "./Overlay";


export default function Login_Register(Data) {

    const [IsVisible, setIsVisible] = useState(Data.Active);
    const container = useRef(null);
    const active = IsVisible  === 'Register' ?  ' container right-panel-active' : ' container';
    useEffect(()=> {
        if (IsVisible === 'Register')
            container.current && container.current.classList.add("right-panel-active");
        else if(IsVisible === 'Login')
            container.current && container.current.classList.remove("right-panel-active");
    },[IsVisible]);
    return (
        <div className={active} id="container" ref={container}>
            <div className='row'>
                <div className='col-md-6' hidden={IsVisible === 'Login'}><Register refUser={Data.RefId}></Register></div>
                <div className='col-md-6 ' hidden={IsVisible === 'Register'}><Login></Login></div>
                <Overlay setVisibility={setIsVisible}></Overlay>
            </div>
        </div>
    );

}
