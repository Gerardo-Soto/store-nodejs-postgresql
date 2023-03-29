import http from "k6/http";

export const options = {
    duration: '10s',
    vus: 10,
};


export default function () {
    let response = http.get('http://127.0.0.1:3000/api/v1/categories');
};

