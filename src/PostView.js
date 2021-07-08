import { DataStore } from 'aws-amplify';

function PostView({ post }) {
    return <div className="post">
        <div className="content">
            {post.content}
        </div>
        <div>
            {/* <button>Add comment</button> */}
            <button onClick={async () => {
                await DataStore.delete(post)
            }}>Delete</button>
        </div>
    </div>
}

export default PostView