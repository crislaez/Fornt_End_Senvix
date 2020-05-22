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

export default 
    {
        addChatFetch,
        getChatUserFetch,
        getVideoName,
        getUserByName,
        getUserById
    };