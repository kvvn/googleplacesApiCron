/**
 * Created by kvvn on 9/8/16.
 */
import {httpclient} from "./httpclient";
import {Stadium} from "./StadiumObjects/Stadium"
import {Config} from "./Config"
import {DB} from "./DB/DB"
declare var require: any;


var resp: any;
var url: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var radius: string  = "50000";
var keyword: string = "\u0444\u0443\u0442\u0431\u043e\u043b";
var types: string = "stadium";
var config = new Config();

var stadiums: Array<Stadium>;


var client = new httpclient(genUrl());

console.log(genUrl());

var db = new DB();

var response = client.get(function(response){
    console.log(response);
    stadiums = response.results;
    for(var i:number = 0; i< stadiums.length; i++) {
        db.addStadium(stadiums[i], function(id, stad)
        {
            db.addPhotosID(id, stad);
        });
    }
});


function genUrl() {
    var location: string = '50.4501,30.5234';

    return url + 'location=' + location +
        '&radius=' + radius +
        '&keyword=' + encodeURI(keyword) +
        '&types=' + types +
        '&key=' + config.API_key;
}



