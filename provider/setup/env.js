const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();


const path = fs.readFileSync('.env.' + process.env.NODE_ENV);
const config = dotenv.parse(path);
for(const k in config){
    process.env[k] = config[k];
}
