import { configureStore } from '@reduxjs/toolkit'
import { learnGermanApi } from './api'

const store = configureStore({
  reducer: {
    [learnGermanApi.reducerPath]: learnGermanApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(learnGermanApi.middleware),
})

export default store
