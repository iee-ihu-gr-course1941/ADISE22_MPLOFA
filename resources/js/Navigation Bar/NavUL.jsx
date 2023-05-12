import {NavButton} from "./NavButton";
import {NavLI} from "./NavLI";
import {Link, useForm} from "@inertiajs/inertia-react";
import {Room} from "../Game Components/Room";

export function NavUL(props) {
    const { data, setData, post, processing, errors, reset } = useForm({});

    function handleLogout() {
        post();
    }

    const LoggedOptions =
        <li className='nav-item justify-content-end w-100'>
            <Link href={route('logout')} method={'post'} as={'button'}
                  className="btn btn-outline-danger text-center nav-item" type="button" only={['Rooms']}>
                Logout
            </Link>
        </li>,
        GuestOptions = <>
            <NavLI link={route('login')} name='Log In'></NavLI>
            <NavLI link={route('register')} name='Register'></NavLI>
        </>;
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className='navbar-nav text-center w-100'>
                {props.Guest ? GuestOptions : LoggedOptions}
            </ul>
        </div>
    );
}
