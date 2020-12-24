import React from 'react';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
    //console.log(props)
    return (
        <article className="Post" >
            <h1 onClick={props.postClick}>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )
};

export default withRouter(post);