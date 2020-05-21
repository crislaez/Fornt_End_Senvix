const addChatFetch = (data) => {
    return fetch('http://localhost:3001/api/addChat',{method:'POST',body:data}).then(data => data.json())
}

const getChatUserFetch = (data) => {
    return fetch('http://localhost:3001/api/getChatUsers',{method:'POST',body:data}).then(data => data.json())
}

export default {addChatFetch,getChatUserFetch};