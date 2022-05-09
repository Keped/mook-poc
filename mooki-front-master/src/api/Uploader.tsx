import * as AWS from "@aws-sdk/client-s3";
import { PutObjectAclCommandInput } from "@aws-sdk/client-s3";
const client = new AWS.S3({ region: "REGION" });
const uploader = {
  upload: async (b: Blob)=> {
    // async/await.
    const params = {Bucket: "mooki-poc-recordings", Key: "arn:aws:kms:us-east-1:883456886475:key/6fa04e74-f1cb-4531-8c26-647a4a08ec51", Body: b } as PutObjectAclCommandInput
    try {
      console.log(params)
      const uploadResult = await client.putObject(params);
      console.log(uploadResult)
      // process data.
    } catch (err) {
      console.error({err})
      // error handling.
    }  
  }
}

export default uploader;
