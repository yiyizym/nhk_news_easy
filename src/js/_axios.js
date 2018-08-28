import axios from 'axios';

const _axios = axios.create({
    timeout: 3000,
    headers: {
        accept: 'application/json',
    },
});

export default _axios;