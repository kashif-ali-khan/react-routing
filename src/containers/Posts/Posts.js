import React, { Component } from "react";
import axiosInstance from './../../axios';
import Post from '../../components/Post/Post';
import FullPost from './../../components/FullPost/FullPost';
import './Posts.css';
import { Link, Route } from "react-router-dom";

class Posts extends Component {
    state = {
        posts: [],
        selectedPost: null,
        error: false
    }
    componentDidMount() {
        console.log(this.props);
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
        console.log(this.props);
        this.props.history.push({
            pathname: '/posts/' + id
        })

    }
    render() {
        let posts = null;
        if (this.state.error) {
            posts = <p>Some error</p>
        } else {
            posts = this.state.posts.map((post) => (
                // <Link to={"/posts/"+post.id} key={post.id}>
                <Post
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    postClick={() => this.postClickHandler(post.id)}
                />
                // </Link>
            ))
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts;