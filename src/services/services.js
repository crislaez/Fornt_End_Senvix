const addChatFetch = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/addChat',{method:'POST',body:data}).then(data => data.json())
}

const getChatUserFetch = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/getChatUsers',{method:'POST',body:data}).then(data => data.json())
}

const getVideoName = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/getVideoName/'+data,{method:'GET'}).then(data => data.json())
}

const getUserByName = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/getUserByName/'+data, {method:'GET'}).then(data => data.json())
}

const getUserById = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/user/'+data, {method:'GET'}).then(data => data.json())
}

const login = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/login', {method:'POST', body:data}).then(data => data.json())
}

const addVideo = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/addVideo',{method:'POST', body:data}).then(data => data.json())
}

const addComent = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/addComent',{method:'POST', body:data}).then(data => data.json())
}

const deleteChat = (data) => {
    return fetch(process.env.REACT_APP_DATABASE_URL+'/deleteChat/'+data, {method:'DELETE'}).then(data => data.json());
}

export default 
    {
        addChatFetch,
        getChatUserFetch,
        getVideoName,
        getUserByName,
        getUserById,
        login,
        addVideo,
        addComent,
        deleteChat
    };