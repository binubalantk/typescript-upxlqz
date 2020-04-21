import {Configuration} from "../classes/Configuration";
import {InvalidServiceURLException} from "../Exceptions/InvalidServiceURLException";
import {HttpResponseCodes} from "../Constants/HttpResponse.enum";

export interface IHttpResponse<DATA> {
    httpStatus: HttpResponseCodes;
    data: DATA;
}

export class HttpController {

    private configuration: Configuration;

    constructor(configuration: Configuration) {
        this.configuration = configuration;
    }

    /**
     * extract XHR handle
     * @return {XMLHttpRequest}
     */
    private static getXHRHandle(): XMLHttpRequest {
        return new XMLHttpRequest();
    }

    private getServiceUrl(defaultUrl?: string): string {
        if (defaultUrl) {
            return defaultUrl;
        } else if (this.configuration.serviceUrl) {
            return this.configuration.serviceUrl;
        } else {
            throw new InvalidServiceURLException();
        }
    }

    /**
     * Send form data
     * @param data
     * @param header
     * @param url
     * @returns {Promise<RESPONSE>}
     */
    public formDataSend<REQUEST, RESPONSE>(
        data: { [key: string]: REQUEST },
        header: { [key: string]: string },
        url?: string
    ) {
        return new Promise<IHttpResponse<RESPONSE>>((resolve, reject) => {

            //xhr object
            const xhr = HttpController.getXHRHandle();

            //service url
            const serviceURL: string = this.getServiceUrl(url);

            //open http connection
            xhr.open('POST', serviceURL);

            //initialize form data
            let formData = '';

            //parse input data
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    let value: string = '';
                    if (formData !== '') {
                        formData += '&';
                    }

                    if (typeof data[key] === 'string') {
                        value = data[key] as unknown as string
                    } else if (HttpController.isArray(value) || typeof value === 'object') {
                        value = JSON.stringify(value);
                    }

                    formData += key + '=' + encodeURIComponent(value);
                }
            }

            //parse header
            if (header) {
                for (const key in header) {
                    if (header.hasOwnProperty(key)) {

                        const headerEntry = header[key];

                        xhr.setRequestHeader(key, headerEntry);
                    }
                }
            }

            //set header content-type
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            //set response type to json
            xhr.responseType = 'json';

            //setup http on load response callback
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        httpStatus: xhr.status,
                        data: xhr.response as RESPONSE
                    });
                } else {
                    reject({
                        httpStatus: xhr.status,
                        data: xhr.response
                    });
                }
            };

            //setup http on error response callback
            xhr.onerror = () => {
                reject({
                    httpStatus: xhr.status,
                    data: xhr.response
                });
            };

            //send form data via http
            xhr.send(formData);
        });
    }

    /**
     * Check array type
     * @param obj
     * @return {arg is Array<any> | boolean}
     */
    private static isArray(obj: any) {
        if (typeof Array.isArray === 'undefined') {
            return Object.prototype.toString.call(obj) === '[object Array]';
        } else {
            return Array.isArray(obj);
        }
    }
}