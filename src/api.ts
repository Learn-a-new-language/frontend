import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const IS_DEV = false;
const LOCAL_URL = 'http://localhost:3333/api/'
const PROD_URL = 'http://learn-german-notion-api-2-env.eba-pr8j3j7w.eu-central-1.elasticbeanstalk.com/api/'

export const learnGermanApi = createApi({
  reducerPath: 'learnGermanApi',
  baseQuery: fetchBaseQuery({ baseUrl: IS_DEV ? LOCAL_URL : PROD_URL }),
  endpoints: (builder: any) => ({
    getDictionary: builder.query({
      query: (length = 20) => `dictionary?length=${length}`,
    }),
    updateDictionary: builder.mutation({
      query: ({ word, priority }) => ({
        url: `dictionary?word=${word}&priority=${priority}`,
        method: 'PATCH',
        body: { word, priority }
      })
    })
  }),
})

export const giphyApi = createApi({
  reducerPath: 'giphyApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder: any) => ({
    search: builder.query({
      query: (searchQuery: string, length: number) => `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=nT4XIDug6MHFpmYvQZ2uwgFVOzeUE6MD&limit=${length}`,
    }),
    translate: builder.query({
      query: ([searchQuery, weirdness]) => `https://api.giphy.com/v1/gifs/translate?s=${searchQuery}&api_key=nT4XIDug6MHFpmYvQZ2uwgFVOzeUE6MD&weirdness=${weirdness}`,
    }),
  }),
})

export const { useGetDictionaryQuery, useUpdateDictionaryMutation } = learnGermanApi
export const { useLazySearchQuery, useLazyTranslateQuery } = giphyApi
