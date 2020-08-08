import React from 'react'

export default function PostList(props){
    return(
        <ul>
            {props.data.map( (i, id) => (
                props.deletePost ? (
                    <li key={id}>{i.title} | <button onClick={() => props.deletePost(i)}>delete</button></li>
                ) : (
                    <li key={id}>{i.title}</li>
                )
            ))}
        </ul>
    )
}