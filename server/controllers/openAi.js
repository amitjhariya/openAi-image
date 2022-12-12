import { OpenAIApi } from 'openai'

import { openAiConfig } from '../config/index.js'
const openAi = new OpenAIApi(openAiConfig);

export const imageGenerate = async (req, res) => {
    
    const { search, size } = req.body
    const imageSize = size === 'medium' ? '512x512': size === 'large' ? '1024x1024':'256x256'
    try {
        const response = await openAi.createImage({
            prompt: search,
            n: 1,
            size: imageSize,
        });
        const image_url = response.data.data[0].url;
        res.status(200).json({
            success: true,
            data: image_url
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }

}

