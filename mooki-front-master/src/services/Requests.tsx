const axios = require('axios').default;
const BASE_URL = 'https://mooki.herokuapp.com/api'



// const getReqest = (url: string) => {
//     axios.get(BASE_URL + url)
//         .then((response: any) => {
//             console.log('res', response);
//         })
//         .catch((error: any) => {
//             console.log('err', error);
//         })
// }

// const postReqest = (url: string, body: object) => {
//     axios.post(BASE_URL + url, body)
//         .then((response: any) => {
//             console.log('res', response);
//         })
//         .catch((error: any) => {
//             console.log('err', error);
//         })
// }

const _request = (type: string, method: string, data: object | null) => {

    return new Promise((resolve, reject) => {

        if (method === 'GET') {
            axios.get(BASE_URL + type)
                .then((response: any) => {
                    // console.log('res', response.data);
                    resolve(response.data)
                })
                .catch((error: any) => {
                    console.log('err', error);
                    resolve(error)
                })
        }

        if (method === 'POST') {
            axios.post(BASE_URL + type, data)  
                .then((response: any) => {
                    resolve(response.data)
                })
                .catch((error: any) => {
                    console.log('err', error);
                })
        }
    })
} 



export const createSession = () => {
    return _request('/api/create_session', 'GET', null)
}

export const addParticipant = async (token: string) => {
    return _request('/api/add_participant','POST' ,{token})  as Promise<{[key: string]: string}>
}

export const uploadRecord = (body: object) => {
    console.log('upload obj', body)
    return _request('/api/recording_uploaded','POST' ,body)
}

export const startRecording = (sessId: string | number) => {
    return _request(`/api/start_recording/${sessId}`,'GET', null)
}

// export const stopRecording = (sessId: string | number) => {
//     return _request(`/stop_recording/${sessId}`,'GET', null)
// }

export const checkStatus = (sessId: string | number) => {
    return _request(`/api/status/${sessId}`,'GET', null) as Promise<Record<string, string|number>>
}


export default {}

