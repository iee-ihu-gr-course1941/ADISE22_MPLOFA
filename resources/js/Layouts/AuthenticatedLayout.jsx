import React, { useState } from 'react';
import {NavBar} from "../Navigation Bar/NavBar";
import {UserContext} from "../Contexts/UserContext";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <>
            <NavBar></NavBar>
            <div className="">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}
                    <main className={'h-100'}>
                        {children}
                    </main>
            </div>
        </>
    );
}
