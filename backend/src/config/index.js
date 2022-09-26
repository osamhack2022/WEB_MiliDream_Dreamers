import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

// if (envFound.error) {

//     throw new Error("⚠️  .env 파일을 찾을 수 없습니다  ⚠️")
// }

export default ({
    port: parseInt(process.env.PORT, 10),

    // database:


    /**  
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },


    /**  
     * API configs
     */
    api: {
        //
    },
    

})