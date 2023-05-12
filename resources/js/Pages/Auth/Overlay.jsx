export default function Overlay({setVisibility}) {

    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <h6 className='p-3'>Sign in to your account.</h6>
                    <button className="btn btn-info" id="signIn" onClick={()=>{setVisibility('Login');document.title = 'Login';}}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <h6 className='p-3'>Create an account, start BLUFFING right away.</h6>
                    <button className="btn btn-info" id="signUp" onClick={()=>{setVisibility('Register');
                        document.title = 'Register';}}>Create Account</button>
                </div>
            </div>
        </div>
    );
}
