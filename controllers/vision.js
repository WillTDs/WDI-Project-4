const rp = require('request-promise');

function visionProxy(req, res) {
  rp({
    url: 'https://vision.googleapis.com/v1/images:annotate',
    method: 'POST',
    json: true,
    qs: { key: process.env.GOOGLE_VISION_API_KEY },
    body: {
      requests: [{
        image: { content: req.body.base64.match(/base64,(.*)$/)[1] },
        features: [{
          type: 'WEB_DETECTION',
          maxResults: 2
        }]
      }]
    }
  })
    .then((response) => res.json(response.responses[0].webDetection.webEntities))
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  proxy: visionProxy
};
