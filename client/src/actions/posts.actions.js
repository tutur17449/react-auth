import fetcher from '../tools/fetcher'

const getPosts = async () => {
    const config = {
        method: 'GET',
    }

    const response = await fetcher(`https://jsonplaceholder.typicode.com/posts`, config)
    return response
}

const deletePost = async (id) => {
    const config = {
        method: 'DELETE',
    }

    const response = await fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`, config)
    return response
}

export {getPosts, deletePost}