function LoginButton({ isLoggedIn, onLogin, onLogout }) {
    if (isLoggedIn) {
        return <button className="user-button" onClick={onLogout}>
            <img className="avatar" src="https://source.unsplash.com/random" />
            <div className="username">
                Rene Brandel
            </div>
            <div className="log-out">
                Log out
            </div>
        </button>
    } else {
        return <button className="user-button" onClick={onLogin}>
            <div>
                Login
            </div>
        </button>
    }
}

export default LoginButton