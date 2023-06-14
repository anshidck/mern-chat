import axios from 'axios'

const API_URL = '/api/chat/'

const fetchChats = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const createChat = async (chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, chatData, config)

    return response.data
}

const createGroup = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL + 'group', groupData, config)

    return response.data
}

const updateRename = async (chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + 'rename', chatData, config)

    return response.data
}

const updateAddUser = async (chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + 'groupadd', chatData, config)

    return response.data
}

const removeFromGroup = async (chatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + 'groupremove', chatData, config)

    return response.data
}


const chatService = {
    fetchChats,
    createChat,
    createGroup,
    updateRename,
    updateAddUser,
    removeFromGroup
}

export default chatService