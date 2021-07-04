import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query/react'

export const learnGermanApi = createApi({
  reducerPath: 'learnGermanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://learn-german-notion-api-2-env.eba-pr8j3j7w.eu-central-1.elasticbeanstalk.com/api/' }),
  endpoints: (builder: any) => ({
    getDictionary: builder.query({
      query: (length = 20) => `dictionary?length=${length}`,
    }),
  }),
})

export const { useGetDictionaryQuery } = learnGermanApi
