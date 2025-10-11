import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})


// for get data
export const getApiData = () => {
    return api.get("/posts")
}


// for post data
export const postApiData = (dataToPost) => {
    return api.post("/posts", dataToPost)
}

// for Delete data
export const deleteApiData = (id) => {``
    return api.delete(`/posts/${id}`)
}
// for put data
export const putApiData = (id, putData) => {
    return api.put(`/posts/${id}`, putData)
}