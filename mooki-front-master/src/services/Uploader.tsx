// ES6+ example
import * as AWS from "@aws-sdk/client-s3";
import { PutObjectCommandInput, S3ClientConfig } from "@aws-sdk/client-s3";

import * as ENV from "../.env" 
//Optional Import
 
const config: S3ClientConfig = {
  credentials:{ accessKeyId: ENV.IAM_KEY,
    secretAccessKey: ENV.IAM_SECRET,},
    // bucketName: 'mooki-poc-recordings',
    region: "us-east-1",
   
}
export const upload = async (b: Blob, startTime = new Date(), participantId = "1") => {
  const client = new AWS.S3(config);
  try {
    const response = await client.putObject({
      Key:`${startTime.getTime()}-${participantId}`,
      Body: b,
      Bucket:'mooki-poc-recordings',
      
    } as PutObjectCommandInput);
    return response
  } catch (error) {
    console.log({err:error})
  }
}
