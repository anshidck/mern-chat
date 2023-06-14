import axios from 'axios'

const API_URL = '/api/message/';

const createMessage = async (messageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, messageData, config)

    return response.data
}

const fetchMessages = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + id, config)
  
    return response.data
  }

const messageService = {
    createMessage,
    fetchMessages
}

export default messageService
