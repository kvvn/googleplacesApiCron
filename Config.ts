/**
 * Created by kvvn on 9/9/16.
 */

class Config {
    API_key: string = '';
    // mysql connection properties
    Mysql_Host: string = 'localhost';
    Mysql_Port: number = 3306;
    Mysql_User: string = '';
    Mysql_Pass: string = '';
    Mysql_DB: string = 'football_trips';
    Mysql_Charset = 'UTF8_GENERAL_CI';
}

export {Config};
