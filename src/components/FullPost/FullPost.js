import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPOst: null
    }

    loadData(){
        this.postId = +this.props.match.params.id;
        console.log(this.postId);
        if (this.postId) {
            if (!this.state.loadedPOst || (this.state.loadedPOst && this.state.loadedPOst.id !== this.postId)) {
                console.log(this.state.loadedPOst,this.postId);
                axios.get('/posts/' + this.postId)
                    .then(response => {
                        this.setState({
                            loadedPOst: response.data
                        })
                    })
            }
        }
    }
    componentWillMount() {
        this.loadData();
    }

    componentDidUpdate(){
        this.loadData();

    }
    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.postId) {
             post = <p style={{ textAlign: 'center' }}>Loading</p>;
        }
        if (this.state.loadedPOst) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPOst.title}</h1>
                    <p>{this.state.loadedPOst.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;