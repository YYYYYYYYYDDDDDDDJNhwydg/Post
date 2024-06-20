import React from 'react';
import MyButton from './UI/Button/MyButton';
import { useNavigate } from 'react-router-dom';

const PostsItem = (props) => {
    const navigate = useNavigate();
    
    return (
        <div className="post">
            <div className="post-content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post-btn">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Remove</MyButton>
            </div>
        </div>
    );
};

export default PostsItem;
