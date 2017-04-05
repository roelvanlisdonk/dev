// Based on: http://blog.garstasio.com/you-dont-need-jquery/ajax/

export interface IHttpResult {
    error: (e: any) => {};
    success: (data: any) => {};
}

//'myservice/username?id=some-unique-id'
export function get(url: string, data?: any, state?: any) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('User\'s name is ' + xhr.responseText);
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}