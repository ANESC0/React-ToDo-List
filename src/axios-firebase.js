import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-list-bc1ec-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;