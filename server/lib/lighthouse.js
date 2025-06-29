import lighthouse from '@lighthouse-web3/sdk'

const apiKey = process.env.LIGHTHOUSE_API_KEY;

export const uploadText = async (text) => {
    const response = await lighthouse.uploadText(text, apiKey)

    return response;
}

export const uploadFile = async (filePath) => {
    const uploadResponse = await lighthouse.upload(
        filePath, apiKey
    )

    return uploadResponse
}