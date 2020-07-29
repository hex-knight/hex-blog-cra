let secret;
if(process.env==="PRODUCTION"){
    secret = process.KEY;
}else{
    secret = require('./config.js').CREATOR_ID
}
export const key = secret;
