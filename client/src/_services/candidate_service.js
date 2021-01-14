import axios from 'axios'
import { CANDIDATES } from '_utils/api'

const fetchCandidates = (params) => {
    return axios.get(CANDIDATES)
}

export const candidatesService = {
    fetchCandidates
}