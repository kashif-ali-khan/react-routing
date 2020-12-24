import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
//import NewPost from '../../components/NewPost/NewPost';
import Posts from './../Posts/Posts';
import './Blog.css';
import axiosInstance from './../../axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import AsyncComponent from './../../hoc/asyncComponent';

const AsyncNewPost = AsyncComponent(()=>{
    return import('../../components/NewPost/NewPost');
})
class Blog extends Component {
    state = {
        posts: [],
        selectedPost: null,
        error: false,
        auth: true
    }
    componentDidMount() {
        axiosInstance.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'kashif'
                    }
                })
                this.setState({
                    posts: updatePosts
                })
            }).catch(error => {
                this.setState({
                    error: true
                })
            })
    }

    postClickHandler = (id) => {
        console.log(id);
        this.setState({
            selectedPost: id
        })

    }
    render() {
        let posts = null;
        if (this.state.error) {
            posts = <p>Some error</p>
        } else {
            posts = this.state.posts.map((post) => (
                <Post
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    postClick={() => this.postClickHandler(post.id)}
                />
            ))
        }
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to={{
                                pathname: "/posts/",
                                // hash: "submit",
                                // search: "?search=login"
                            }}>Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>

                        </ul>
                    </nav>
                </header>
                {/* <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPost={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section> */}
                {/* <Route path="/" exact render={()=>(<h1>Home</h1>)} /> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={()=>(<h1>Not found</h1>)} />
                    <Redirect from="/" to="/posts" />

                </Switch>

            </div>
        );
    }
}

export default Blog;