/**
 * Created by kvvn on 9/8/16.
 */
declare var require: any;
var needle = require('needle');
var options = {
    headers: { 'Content-Type': 'text/xml; charset=UTF-8' }
};
class httpclient {
    url: string;

    constructor(url:string) {
        this.url = url;
    }

    post(callback):any {
        needle.post(this.url, function(err, res) {
            if (err) throw err;
            return callback(res.body);
        });
    }

    get(callback):any {
        needle.get(this.url, options, function(err, res) {
            if (err) throw err;
            return callback(res.body);
        });
    }
}

export {httpclient};