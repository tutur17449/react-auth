import React, { useEffect } from 'react'
import Navbar from '../components/navbar/index'
import Loader from '../components/loader/index'
import Footer from '../components/footer/index'
import PostList from '../components/postList/index'
import postsReducer from '../reducers/posts.reducer'
import Role from '../global/role'
import {getPosts, deletePost} from '../actions/posts.actions'

export default function Post(){

    const initialState = {
        posts: [],
        error: null,
        isLoading: true
    }
    const [state, dispatch] = React.useReducer(postsReducer, initialState)

    useEffect(() => {
        async function init(){
            try {
                const response = await getPosts()
                dispatch({
                    type: "GET_POSTS",
                    playload: response
                })
            } catch (error) {
                dispatch({
                    type: "ERROR",
                    playload: 'No data ...'
                })
            }
        }
        init()
    }, [])

    const removePost = async (post) => {
        dispatch({
            type: "LOADING"
        })
        try {
            const response = await deletePost(post.id)
            dispatch({
                type: "DELETE_POST",
                playload: post.id
            })
        } catch (error) {
            dispatch({
                type: "ERROR",
                playload: 'Can\'t remove post ...'
            })
        }
    }

    return(
        <React.Fragment>
            <Navbar />
            <h1>PostsList</h1>
            {state.error !== null && <p>{state.error}</p>}
            {state.isLoading ? (
                <Loader />
            ) : (
                <Role
                    action="post:postsList"
                    yes={
                        <PostList
                            data={state.posts}
                            deletePost={removePost}
                        />
                    }
                    no={
                        <PostList
                            data={state.posts}
                        />
                    }
                />
            )}
            <Footer />
        </React.Fragment>
    )
}