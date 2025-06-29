import { validateMetadataURIContent } from '@zoralabs/coins-sdk';
import { fetchCast, replyToCast } from '../lib/neynar.js';
import { createZoraCoin } from '../lib/zora.js';
import { getSecureRandomNumber } from '../utils/utils.js';
import { generateComicImage } from './imageGen.js';
import { uploadImageToIpfs } from './imageUpload.js';

const signerUuid = process.env.APPROVED_UUID;

export async function handleWebhook(event) {
    if (!event || typeof event !== 'object') {
        throw new Error('Invalid webhook payload');
    }

    const { type, data } = event;


    switch (type) {
        case 'cast.created':
            await handleCastCreated(data);
            break;

        default:
            console.warn(`⚠️ Unsupported event type: ${type}`);
    }

}

async function handleCastCreated(data) {
    const cast1 = {
        text: "",
        pfp: ""
    };

    const cast2 = {
        text: "",
        pfp: ""
    };


    if (!data?.parent_hash) {
        console.log("Found a direct mention");
        return;
    }

    const oneCastUp = await fetchCast(data?.parent_hash);

    if (!oneCastUp) {
        console.log("Couldn't fetch the parent cast");
    }

    const twoCastUp = await fetchCast(oneCastUp?.cast.parent_hash);

    cast1.text = oneCastUp?.cast?.text;
    cast1.pfp = oneCastUp?.cast?.author?.pfp_url;

    cast2.text = twoCastUp?.cast?.text;
    cast2.pfp = twoCastUp?.cast?.author?.pfp_url;


    // generate the image.
    const response = await generateComicImage(cast2, cast1);

    const version = getSecureRandomNumber(10, 1000);

    const imgMetaData = {
        "name": `ComicOn - Strip #${version}`,
        "description": "Generated using ComicOn! Captures your conversation",
        "image": "",
        "properties": {
            "category": "social"
        }
    }

    const ipfsResponse = await uploadImageToIpfs(response?.data[0]?.b64_json, imgMetaData)

    // // if the image is generated coin it using Zora.
    const coin = await createZoraCoin(data?.author?.custody_address, `https://gateway.lighthouse.storage/ipfs/${ipfsResponse.data.Hash}`);

    const castText = `Here's your fresh comic. \\n CA: ${coin.address}`;
    const embeds = [
        {
            url: `https://gateway.lighthouse.storage/ipfs/${ipfsResponse.imgCID}`,
        },
    ];
    // Send these details as reply to this cast.
    await replyToCast(signerUuid, castText, embeds, data?.hash, data?.author?.fid)
}
