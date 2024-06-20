import { useMemo } from "react";

export const useSortedPosts = (posts = [], sort) => {
    const sortedPosts = useMemo(() => {
        // console.log('useSortedPosts - posts:', posts, 'sort:', sort); // Debugging
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (posts = [], sort, query = '') => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        // console.log('usePosts - sortedPosts:', sortedPosts, 'query:', query); // Debugging
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}
