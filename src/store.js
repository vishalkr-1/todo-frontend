import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'

import { taskApi } from './features/todos/todoSlice'

export const store = configureStore({
  reducer: {
    
    [taskApi.reducerPath]: taskApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
})

