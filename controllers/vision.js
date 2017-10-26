const rp = require('request-promise');

function visionProxy(req, res) {
  rp({
    url: 'https://vision.googleapis.com/v1/images:annotate',
    method: 'POST',
    json: true,
    qs: {
      key: process.env.GOOGLE_VISION_API_KEY
    },
    body: {
      'requests': [
        {
          'image': {
            'content': // base64 //
          },
          'features': [
            {
              'type': 'WEB_DETECTION',
              'maxResults': 2
            }
          ]
        }
      ]
    }

  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: visionProxy
};

// 'source': {
//   'imageUri':
//     'https://laikatourist.com/wp-content/uploads/2016/08/machu-picchu-travel.jpg'
// }
