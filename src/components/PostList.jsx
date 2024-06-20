import React from 'react';
import PostsItem from './PostsItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PostList = ({posts, title, remove}) => {

    if(!posts.length) {
        return (
            <h1>Посты не найдены</h1>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostsItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList