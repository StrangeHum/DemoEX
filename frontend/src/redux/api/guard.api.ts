//TODO auth token
//https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery

// import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// import type { RootState } from './store'

// const baseQuery = fetchBaseQuery({
//   baseUrl: '/',
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token

//     // If we have a token set in state, let's assume that we should be passing it.
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`)
//     }

//     return headers
//   },
// })