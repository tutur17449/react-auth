export default function postsReducer(state, action) {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                isLoading: false,
                posts: action.playload
            }
        case 'DELETE_POST':
            return {
                ...state,
                isLoading: false,
                posts: state.posts.filter(post => post.id !== action.playload)
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.playload
            }
        default:
            throw new Error();
    }
}