import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

export class apiClient {
    constructor(url){ this._url = url; }

    get(source, func, token){
        const options = {
            method: 'get',
            url: this._url + '/' + source,
            transformResponse: (res) => {
                //console.log(res);
                return JSON.parse(res);
            }
        };
        if(token) { options['headers'] = { Authorization: `Bearer ${token}` }; };
        trackPromise(
            axios(options).then(
                (res) => {
                    const result = res.data;
                    if(result !== null){ func(result); };
                },
                (err) => {
                    console.error(err);
                }
            )
        )
    }

    async fetchJson(source, func){
        const response = await fetch(this._url + '/' + source, {  method: "GET", headers: { "Content-Type" : "application/json" } });
        const res = await response.json();
        if(res){ func(res); };
    }

    post(source, request, func, token) {
        let m = 'post';
        if (this._url.indexOf('static') > -1) m ='get';
        const options = {
            method: m,
            url: this._url + '/' + source,
            transformResponse: (res) => {
                //console.log(res);
                return JSON.parse(res);
            },
            data: request
        };

        if(token) { options['headers'] = { Authorization: `Bearer ${token}` }; };

        trackPromise(
            axios(options).then(
                (res) => {
                    const result = res.data;
                    if(result !== null) {
                        func(result); 
                    };
                }, 
                (error) => {
                    console.error(error);
                }
            )
        );
    }
}