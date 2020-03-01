import axios from 'axios'
const API_HOME = 'http://120.79.147.66:8081'

// http://120.79.147.66:8081/survey2/submit
// http://120.79.147.66:8081/survey2/results
// http://120.79.147.66:8081/survey2/clearall

export const submitExperimentInfo = (experimentData) => {
    return axios.post(`${API_HOME}/survey2/submit`,{
        data: experimentData
    });
}

export const getExperimentData = () => {
    return axios.get(`${API_HOME}/survey2/results`)
}

export const clearExperimentData = () => {
    return axios.post(`${API_HOME}/survey2/clearall`)
}