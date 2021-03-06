import React, { useContext, useEffect } from 'react'
import { userContext } from '../../App';
import { NavLink, useNavigate } from 'react-router-dom'
import Post from '../Home/Post';
import PostForm from '../Home/PostForm';

import { useGetUserPostsQuery } from "../../Graphql/Graphql-codegen/graphql.tsx";

function AccountPage() {
    let { state, dispatch } = useContext(userContext)
    let navigate = useNavigate()

    const { data, refetch } = useGetUserPostsQuery({
        variables: {
            email: state.email
        }
    });
    useEffect(() => {
        if (state.user === false) {
            navigate("/login")
        }
        refetch()
    }, [])
    return (
        <>
            <div className="ui container">
                <div className="ui menu">
                    <a className="active item" style={{ padding: "10px 20px !impoartant" }}>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </a>
                    <div className="right menu">
                        {
                            state.user === true ? (
                                <NavLink to="/account" className="item" >Hello {state.username.split(" ")[0]}</NavLink>
                            ) : (
                                <></>
                            )
                        }
                        {
                            state.user === true ? (<>
                                <span style={{ color: "white" }} className="item " onClick={() => {
                                    state.logout(dispatch)
                                }}><NavLink to="/login" style={{ color: "black" }}>Logout</NavLink></span>
                            </>) : (
                                <>
                                    <span className="item">
                                        <NavLink to="/login" style={{ color: "black" }}>Login</NavLink>
                                    </span>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="ui container">
                <h2 className="ui header" style={{ margin: "20px 10px" }}>Account Info</h2>
                <div className="ui items" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="item" style={{border:"1px solid gray", width:"fit-content",padding:"20px"}}>
                        <a className="ui tiny image">
                            <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" />
                        </a>
                        <div className="content" style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                            <a className="header">{state.username}</a>
                            <div className="description">
                                <p>{state.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="ui header" style={{ margin: "30px 10px" }}>Your Posts</h2>
                <PostForm reload={refetch}/>
                <h1 style={{ textAlign: "center" }}>Some of the recent Posts</h1>
                <div className="ui cards postcontainer">
                    {
                        data && data.getUserPosts.length === 0 ? (<>
                            <div className="ui raised segment">None of the Post Are available Yet .</div>
                        </>) : (<>
                            {
                                data && data.getUserPosts.map((value, index) => {
                                    return <Post key={index} value={value} />
                                })
                            }
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

export default AccountPage
