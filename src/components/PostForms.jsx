import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/Button/MyButton';

const PostForms = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
      };

    return (
    <form>
        <MyInput 
          value={post.title} 
          onChange={e => setPost({...post, title: e.target.value})}
          type='text' 
          placeholder='Название'
        />
        <MyInput 
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type='text'
          placeholder='Описание'
          />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
    );
};

export default PostForms