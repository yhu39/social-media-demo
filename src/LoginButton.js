function LoginButton({ currentUser, onLogin, onLogout }) {
    if (currentUser) {
        return <button className="user-button" onClick={onLogout}>
            {/* <img className="avatar" src="https://source.unsplash.com/random" /> */}
            <div className="username">
                😀 {currentUser.attributes.email}
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