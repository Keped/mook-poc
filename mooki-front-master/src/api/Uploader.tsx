import * as AWS from "@aws-sdk/client-s3";
import { PutObjectAclCommandInput } from "@aws-sdk/client-s3";
const client = new AWS.S3({ region: "REGION" });
const uploader = {
  upload: async (b: Blob, startTime = new Date(), participantId = "1")=> {
    // async/await.
    const params = {Bucket: "mooki-poc-recordings", Key: `${startTime.getTime()}-${participantId}`, Body: b } as PutObjectAclCommandInput
    try {
      console.log(params)
      const uploadResult = await client.putObject(params);
      console.log(uploadResult)
      return uploadResult;
      // process data.
    } catch (err) {
      console.error({err})
      // error handling.
    }  
  }
}

export default uploader;
