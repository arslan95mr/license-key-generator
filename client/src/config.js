export default class Config {
    static CO_NAME = "Älem Tilsimat";
    static APP_NAME = "LKG";
    static VERSION = "1.0.0";
    
    static IS_DEV = true;
    static LOCAL_IP = 'http://127.0.0.1:4000';
    static URL_SERVER = this.IS_DEV ? this.LOCAL_IP : 'https://lkg.alemtilsimat.com';
    static PATH_PREFIX = this.IS_DEV ? "/static" : "/api/static";
    static PATH_LICENSE_KEY = "/generated/";
}   