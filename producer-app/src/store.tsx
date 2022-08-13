import { configureStore } from '@reduxjs/toolkit'
import mixerReducer from './session-control/mixdown-control/mixerSlice'

export const store = configureStore({
  reducer: {
    mixer: mixerReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch