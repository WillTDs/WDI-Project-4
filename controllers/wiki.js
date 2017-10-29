const rp = require('request-promise');

function wikiProxy(req, res) {
  const lang = req.query.lang || 'en';
  return rp({
    url: `https://${lang}.wikipedia.org/w/api.php`,
    method: 'GET',
    json: true,
    qs: {
      format: 'json',
      action: 'query',
      prop: 'extracts',
      exintro: '',
      explaintext: '',
      titles: req.query.title
    }
  })
    .then((response) => {
      const pageId = Object.keys(response.query.pages)[0];
      const data = response.query.pages[pageId];
      delete data.pageid;
      delete data.ns;
      res.json(data);
    })
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: wikiProxy
};
