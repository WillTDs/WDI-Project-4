const router = require('express').Router();
const places  = require('../controllers/places');
const visionAPI  = require('../controllers/vision');
const wikiAPI  = require('../controllers/wiki');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/places')
  .get(places.index)
  .post(secureRoute, places.create);

router.route('/places/:id')
  .get(places.show)
  .put(secureRoute, places.update)
  .delete(secureRoute, places.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.post('/vision', visionAPI.proxy);
router.get('/wiki', wikiAPI.proxy);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
