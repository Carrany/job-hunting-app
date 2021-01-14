import axios from 'axios'
import { APPLICATIONS } from '_utils/api'

const fetchApplicationByCandidate = (params) => {
    return axios.get(APPLICATIONS, { params })
}

const addComment = (id, data) => {
    return axios.put(`${APPLICATIONS}/${id}`, data)
}


export const applicationsService = {
    fetchApplicationByCandidate,
    addComment
}