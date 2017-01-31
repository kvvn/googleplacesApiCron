"use strict";
/**
 * Created by kvvn on 9/9/16.
 */
var Config_1 = require("../Config");
var mysql = require("mysql");
var DB = (function () {
    function DB() {
        this.config = new Config_1.Config();
        this.connection = mysql.createConnection({
            host: this.config.Mysql_Host,
            user: this.config.Mysql_User,
            password: this.config.Mysql_Pass,
            charset: this.config.Mysql_Charset,
            database: this.config.Mysql_DB
        });
    }
    DB.prototype.addStadium = function (stadium, callback) {
        this.connection.query('insert into stadiums set ?', {
            place_id: stadium.place_id,
            name: stadium.name,
            google_id: stadium.id,
            lat: stadium.geometry.location.lat,
            lng: stadium.geometry.location.lng,
            vicinity: stadium.vicinity
        }, function (err, result) {
            if (err && err.code != 'ER_DUP_ENTRY') {
                throw err;
            }
            else if (err && err.code == 'ER_DUP_ENTRY') {
                console.log(stadium.place_id + 'is in DB');
            }
            else {
                callback(result.insertId, stadium);
            }
        });
    };
    DB.prototype.addPhotosID = function (stadium_id, stadium) {
        var q = stadium.photos.length;
        for (var i = 0; i < q; i++) {
            this.connection.query('insert into google_photo_ids set ?', {
                stadium_id: stadium_id,
                photo_reference: stadium.photos[i].photo_reference,
                height: stadium.photos[i].height,
                width: stadium.photos[i].width
            });
        }
    };
    return DB;
}());
exports.DB = DB;
/*
*
* DATABASE STRUCTURE
*
 CREATE TABLE stadiums
 (
 id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
 place_id VARCHAR(50) NOT NULL,
 name VARCHAR(100) NOT NULL,
 google_id VARCHAR(50),
 lat DECIMAL(6,6) UNSIGNED NOT NULL,
 lng DECIMAL(6,6) UNSIGNED NOT NULL,
 vicinity VARCHAR(150) NOT NULL
 );
 CREATE INDEX stadiums_lat_lng_index ON stadiums (lat, lng);
 CREATE UNIQUE INDEX stadiums_place_id_uindex ON stadiums (place_id);


 CREATE TABLE google_photo_ids
 (
 id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
 stadium_id INT(11) NOT NULL,
 photo_reference VARCHAR(300),
 height INT(11),
 width INT(11)
 );
 CREATE INDEX google_photo_ids_stadiun_id_index ON google_photo_ids (stadiun_id);
* */
