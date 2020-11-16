import {CREATE_QUERY} from '../types'

export const createQuery = (query) => ({
    type: CREATE_QUERY,
    payload: query
})
