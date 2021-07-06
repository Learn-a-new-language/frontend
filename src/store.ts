import { configureStore } from '@reduxjs/toolkit'
import { learnGermanApi, giphyApi } from './api'

const store = configureStore({
  reducer: {
    [learnGermanApi.reducerPath]: learnGermanApi.reducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(learnGermanApi.middleware).concat(learnGermanApi.middleware),
})

export default store
