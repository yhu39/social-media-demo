import { DataStore, Auth } from 'aws-amplify';
import { Post } from './models'
import PostView from './PostView';
import { useEffect, useState } from 'react';
import './App.css';
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';

function App() {
  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [showAuthenticator, setShowAuthenticator] = useState(false)

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      setCurrentUser(currentUser)
      setShowAuthenticator(false)
    } catch (e) {
      setCurrentUser(null)
    }
  }

  useEffect(async () => {
    checkLoginState()

    setPosts(await DataStore.query(Post))
    const subscription = DataStore.observe(Post).subscribe(async () => {
      setPosts(await DataStore.query(Post))
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="App">
      <nav>
        <LoginButton
          onLogin={() => setShowAuthenticator(true)}
          isLoggedIn={currentUser !== null}
          onLogout={async () => {
            await Auth.signOut()
            checkLoginState()
          }} />
        <button onClick={() => {
          DataStore.save(new Post({
            content: window.prompt('New post:')
          }))
        }}>
          Add a new post
        </button>
      </nav>
      <div className="posts">
        <h1>Posts</h1>
        {posts.map(post => <PostView post={post} />)}
      </div>
      {showAuthenticator && 
        <LoginPopup
          onAuthStateChange={() => checkLoginState()}
          onCancel={() => setShowAuthenticator(false)}/>}
    </div>
  );
}

export default App;
