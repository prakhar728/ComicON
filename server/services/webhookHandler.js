import { fetchCast } from '../lib/neynar.js';
import { createZoraCoin } from '../lib/zora.js';

export async function handleWebhook(event) {
    if (!event || typeof event !== 'object') {
        throw new Error('Invalid webhook payload');
    }

    const { type, data } = event;

    console.log(`📩 Received event type: ${type}`);

    switch (type) {
        case 'cast.created':
            await handleCastCreated(data);
            break;

        default:
            console.warn(`⚠️ Unsupported event type: ${type}`);
    }

}

async function handleCastCreated(data) {
    const author = data?.author?.username || 'unknown';
    const text = data?.text || '';
    console.log(`📝 New cast by @${author}: "${text}"`);

    if (!data?.parent_hash) {
        console.log("Found a direct mention. ");
        return;
    }

    const oneCastUp = await fetchCast(data?.parent_hash);

    if (!oneCastUp) {
        console.log("Couldn't fetch the parent cast");
    }

    const twoCastUp = await fetchCast(oneCastUp?.cast.parent_hash);

    const text1 = oneCastUp?.cast?.text;
    const text2 = twoCastUp?.cast?.text;

    console.log("Text1 is ", text1);
    console.log("Text2 is", text2);

    // generate the image.
    //   const img = await generateImage(text1, text2);
    const img = "";


    // if the image is generated coin it using Zora.
    const coin = await createZoraCoin(data?.author?.custody_address);

    console.log(coin);

    // Send these details as reply to this cast.
}
