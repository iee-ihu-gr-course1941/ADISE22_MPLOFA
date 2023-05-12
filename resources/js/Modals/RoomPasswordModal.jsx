import {FormFloatingTextInput} from "../Components/FormFloatingTextInput";
import {Link, useForm} from "@inertiajs/inertia-react";
import {useContext, useState} from "react";
import InputError from "../Components/InputError";
import {ErrorContext} from "../Contexts/ErrorContext";
import {Inertia} from "@inertiajs/inertia";

export function RoomPasswordModal({Room,User}) {
    const [password,setPassword] = useState(''),
    errors = useContext(ErrorContext),
    onsubmit=(e)=>{
        if(password !== ''){
            e.preventDefault();
            Inertia.post(route('Join_Room'),{Password:password,RoomId:Room.id})
        }
    };
    return (
        <div>
            <div>
                <form className={'w-100'} onSubmit={(e)=>{onsubmit(e)}}>
                    <FormFloatingTextInput type={'password'} required={true} name={'Password'} value={password}
                       placeHolder={"Enter Password"} className={''} handleChange={(e) => {setPassword(e.target.value)}}>
                    </FormFloatingTextInput>
                    <strong><InputError message={errors.Password} className="mt-2 text-danger"/></strong>
                </form>
            </div>
            <div>
                <Link href={route('Join_Room')} method={'post'} data={{Password: password, RoomId: Room.id}}
                      as={'button'} className="btn btn-success text-center mt-4 w-50 mx-auto" type="button"
                      disabled={password === ''} preserveScroll={true}>
                    Join
                </Link>
            </div>
        </div>
    )
}
