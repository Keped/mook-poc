// ES6+ example
import * as AWS from "@aws-sdk/client-s3";
import { GetObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import * as ENV from "../../.env" 
import it from "browser-readablestream-to-it";
 
const config: S3ClientConfig = {
  credentials:{ accessKeyId: ENV.IAM_KEY,
    secretAccessKey: ENV.IAM_SECRET,},
    // bucketName: 'mooki-poc-recordings',
    region: "us-east-1",
   
}

export const download = async (key:string) => {
  const client = new AWS.S3(config);
  return new Promise(async (resolve, reject)=>{
    try {

      const result = await client.getObject({Bucket:'mooki-poc-recordings', Key: key});

      const bufferArray = [];
      const response = new Response(result.Body as ReadableStream);
      const blob = await response.blob();
      resolve(blob)

    } catch (error) {
      console.log({ err:error})
    }
  });
  
}

