import { uploadFile, uploadText } from "../lib/lighthouse.js";
import { getSecureRandomNumber } from "../utils/utils.js";
import path from 'path';
import fs from "fs";

export async function uploadImageToIpfs(base64Image, metadata) {
    const m = metadata;
    
    const tempFileName = `temp-${getSecureRandomNumber(10,1000)}.png`;

    const imageBuffer = Buffer.from(base64Image, 'base64');
    const tempFilePath = path.join('/tmp', tempFileName); 
    fs.writeFileSync(tempFilePath, imageBuffer);

    const uploadedImageToIpfs = await uploadFile(tempFilePath);
    m["image"] =  `https://gateway.lighthouse.storage/ipfs/${uploadedImageToIpfs.data.Hash}`

    const uploadedUri = await uploadText(JSON.stringify(m))
    
    fs.unlinkSync(tempFilePath);

    uploadedUri.imgCID = uploadedImageToIpfs.data.Hash;
    return uploadedUri;
}