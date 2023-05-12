import {useContext, useEffect, useState} from "react";
import {ErrorContext} from "../Contexts/ErrorContext";
import {Inertia} from "@inertiajs/inertia";
import {FormFloatingTextInput} from "../Components/FormFloatingTextInput";
import {Link} from "@inertiajs/inertia-react";
import InputError from "../Components/InputError";

export function JoinByLink({handleClick}) {
    const [show, setShow] = useState(false),
        handleShow = () => {
            setShow(!show);
            handleClick();
        },
        [link,setLink] = useState(''),
        // [linkError,setLinkError] = useState(''),
        regex = /^\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/gi,
        errors = useContext(ErrorContext),
        onsubmit=(e)=>{
            if(link !== '') {
                e.preventDefault();
                Inertia.post((route('Join_Room_By_Link')+link),{Password:link,RoomId:Room.id})
            }
        };
    return (
        <>
            { !show && <button className="btn btn-outline-primary w-auto text-center mx-1" type="button" onClick={handleShow}>
                Join Room By Link
            </button>}
            <div hidden={!show} className={'text-center'}>
                <h3 className="offcanvas-title" id="offcanvasExampleLabel">Join a Room by Link</h3>
                    <form className={'justify-content-center'} onSubmit={(e)=>{onsubmit(e)}}>
                        <div className="row justify-content-center">
                            <FormFloatingTextInput
                                type='text'
                                name='Link'
                                value={link}
                                required={true}
                                handleChange={(e) => {setLink(e.target.value);}}
                                placeHolder={"Enter Room Link"}
                                className={'px-3 text-center'}
                                divClassName={'w-50 p-0 my-3'}
                            ></FormFloatingTextInput>
                            {errors.RoomLinkError && <strong><InputError message={errors.RoomLinkError} className="mt-2 text-danger"/></strong>}
                        </div>
                        {/*{linkError !== '' && <strong><InputError message={linkError} className="my-1 text-danger"/></strong>}*/}
                    </form>
                {/*<div className={'text-center'}>*/}
                { show && <button className="btn btn-outline-danger w-auto text-center mx-1" type="button" onClick={handleShow}>
                    Back
                </button>}
                <Link href={(route('Join_Room_By_Link')+link)} method={'post'}
                      as={'button'} className="btn btn-success text-center w-auto mx-auto" type="button"
                      disabled={(link.length === 0) || !regex.test(link)}
                      preserveScroll={true} >
                    Join
                </Link>
            </div>
        </>
    )
}
