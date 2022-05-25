// ES6+ example
import * as AWS from "@aws-sdk/client-s3";
import { PutObjectCommandInput, S3ClientConfig } from "@aws-sdk/client-s3";
import { uploadRecord } from '../services/Requests'
// import { blob } from "stream/consumers";
// import * as ENV from "" 
export const IAM_KEY = "AKIA43MRCI3FVFNAOGQ4";
export const IAM_SECRET = "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"
//Optional Import
 
const config: S3ClientConfig = {
  credentials:{ accessKeyId: IAM_KEY,
    secretAccessKey: IAM_SECRET,},
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
    // data.requestedStartTime = startTime.getTime()
    // data.offsetMs = 0
    // data.fileUrl = `${startTime.getTime()}-${participantId}`
    uploadRecord({offsetMs:0, fileUrl, sessionId, playerId:participantId, requestedStartTime:startTime }).then( res =>{
      return res
    })
   return response
  } catch (error) {
    console.log({ err:error})
  }
}


// @Post('/recording_uploaded')
// onRecordingUploaded(
//   @Body('sessionId') sessionId: string,
//   @Body('playerId') playerId: string,
//   @Body('requestedStartTime') requestedStartTime: Date,
//   @Body('offsetMs') offsetMs = 0,
//   @Body('fileUrl') fileUrl: string,
// ) {
//   return this.appService.recordingFinished({
//     sessionId,
//     playerId,
//     fileUrl,
//     requestedStartTime,
//     offsetMs,
//   });
// }