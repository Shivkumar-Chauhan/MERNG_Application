import React, { useContext, useEffect, useState } from 'react'
import Post from './Post';
import { userContext } from '../../App';
import { NavLink } from 'react-router-dom';
import PostForm from './PostForm';
import Loder from '../templates/Loder';

import { useGetPostDetailsQuery } from "../../Graphql/Graphql-codegen/graphql.tsx";
    
function PostsContainer() {
    let [showloder, updateShowLoder] = useState(1)
    let { state } = useContext(userContext)

    const {data, refetch } = useGetPostDetailsQuery();
    useEffect(() => {
        refetch()
        updateShowLoder(0)
    }, [])
    return (
        <>
            {
                showloder === 1 ? (<>
                    <Loder />
                </>) : (
                    <></>
                )
            }
            {
                state.user === true ? (<>
                    <PostForm reload={refetch} />
                </>) : (
                    <>
                        <NavLink to="/login" className="ui inverted button">Log in</NavLink>
                    </>
                )
            }
            <h1 style={{ textAlign: "center" }}>Some of the recent Posts</h1>
            <div className="ui cards postcontainer">
                {
                    data && data.getPostDetails.length === 0 ? (<>
                        <div className="ui raised segment">None of the Post Are available Yet .</div>
                    </>) : (<>
                        {
                            data && data.getPostDetails.map((value, index) => {
                                return <Post key={index} value={value} />
                            })
                        }
                    </>)
                }
            </div>
        </>
    )
}







export default PostsContainer
