import React, { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import PostList from '../components/PostList';
import MyButton from '../components/UI/Button/MyButton';
import PostForms from '../components/PostForms';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, SetModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query); 
  const lastElement = useRef();
  
  const [fetchPosts, isPostsLoading, postError ] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    SetModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}}onClick={() => SetModal(true)}>
        Создать посты
      </MyButton>
      <MyModal visible={modal} setVisible={SetModal}>
        <PostForms create={createPost} />
      </MyModal>
      <hr style={{margin: '15px 0'}} />
      <PostFilter 
        filter={filter}
        setFilter={setFilter}  
      />
      <MySelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элиментов страницы"
        options={[
          {value: 5, name:'5'},
          {value: 10, name:'10'},
          {value: 25, name:'25'},
          {value: -1, name:'Показать все'},
        ]}
      />
      {postError &&
        <h1>Произошла ошибка</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Cписок постов" />
      <div ref={lastElement} style={{height: 20, backgroundColor: 'red'}}></div>
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50'}}><Loader /></div>
      }      
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
        />
    </div>
  );
}

export default Posts;
