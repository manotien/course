import axios from 'axios';

const token = localStorage.getItem('user').token
const headers = {
    headers: {'Authorization': "bearer " + token}
};
