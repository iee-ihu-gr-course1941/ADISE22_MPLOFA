import React, {useEffect, useState} from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputError from "@/Components/InputError";
import {FormFloatingTextInput} from "../../Components/FormFloatingTextInput";

export default function Login({ status, canResetPassword}) {
    useEffect(() => {
        document.title = 'Login';
    }, []);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="form-container sign-in-container overflow-scroll">
            <form onSubmit={submit} className={'fcl'}>
                <h1 className='my-3'>Sign in</h1>
                    <FormFloatingTextInput
                        type="email"
                        name="email"
                        value={data.email}
                        handleChange={onHandleChange}
                        isFocused={true}
                        required={true}
                        placeHolder={"Email"}/>
                    <FormFloatingTextInput
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={"Password"}
                    />
                <div>
                    <InputError message={errors.email} className="mt-2 text-danger" />
                    <InputError message={errors.password} className="mt-2 text-danger" />
                </div>
                {/*<a className={'link-info text-decoration-none my-2'} href={route('password.request')}>Forgot your password?</a>*/}
                <button className='btn btn-outline-success border-3'>Sign In</button>
                <p className={'my-3'}>
                    OR
                </p>
                <button className='btn btn-outline-secondary border-3 disabled' disabled={true}>Log in as Guest</button>
                <p>( Coming Soon ) </p>
            </form>
        </div>
    );
}
