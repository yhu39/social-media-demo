import { DataStore } from 'aws-amplify';

function PostView({ post, currentUser }) {
    return <div className="post">
        <div className="content">
            {post.content}
        </div>
        <div>
            {(currentUser.attributes.sub === post.owner 
               || currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins'))
             && <button onClick={async () => {
                await DataStore.delete(post)
            }}>Delete</button>}
        </div>
    </div>
}

export default PostView