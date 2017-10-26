const rp = require('request-promise');

function wikiProxy(req, res) {
  return rp({
    // https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Big%20Ben  - full url i'm trying to break down
    url: 'https://en.wikipedia.org/w/api.php',
    method: 'GET',
    json: true,
    qs: {
      format: 'json',
      action: 'query',
      prop: 'extracts',
      exintro: '', // ??
      explaintext: '', // ??
      titles: req.query.title /// The landmark name from vision controller
    }  // titles: response.data.{responses.webDetection.webEntities.description} ??
    // if landmark name is two words insert %20 between words e.g. big%20ben

  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: wikiProxy
};
