import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

// create routes, text to image  with stable-diffusion-v1-5 model  
router.get('/', (req, res) => {
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: {
          Authorization: 'Bearer ' + process.env.HF_ACCESS_TOKEN,
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  query({ inputs: 'A chihuahua with a halloween hat' }).then((response) => {
    // Use image
    res.type(response.type);
    response.arrayBuffer().then((buffer) => {
      res.send(Buffer.from(buffer));
    });
  });
});

export default router;