// ES6+ example
import * as AWS from "@aws-sdk/client-s3";
import { PutObjectCommandInput, S3ClientConfig } from "@aws-sdk/client-s3";
import { uploadRecord } from '../services/Requests'
import * as ENV from "../.env" 

 
const config: S3ClientConfig = {
  credentials:{ accessKeyId: ENV.IAM_KEY,
    secretAccessKey: ENV.IAM_SECRET,},
    // bucketName: 'mooki-poc-recordings',
    region: "us-east-1",
   
}
export const upload = async (b: Blob, startTime: Date, participantId: string, sessionId: string) => {
  const client = new AWS.S3(config);
  console.log('client', client, 'blob in loader', b)
  try {
    const fileUrl = `${startTime.getTime()}-${participantId}-${sessionId}.wav`
    const response = await client.putObject({
      Key:`${startTime.getTime()}-${participantId}.wav`,
      Body: b,
      Bucket:'mooki-poc-recordings',
      
    } as PutObjectCommandInput);
    console.log('loader res', response)
    uploadRecord({offsetMs:0, fileUrl, sessionId, playerId:participantId, requestedStartTime:startTime }).then( res =>{
      return res
    })
   return response
  } catch (error) {
    console.log({ err:error})
  }
}

