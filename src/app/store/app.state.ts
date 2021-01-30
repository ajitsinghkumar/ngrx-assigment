
import { PostsState } from './../posts/state/posts.state';
import { postsReducer } from '../posts/state/posts.reducer';

export interface AppState {

  posts: PostsState;
}

export const appReducer = {
  posts: postsReducer,
};
