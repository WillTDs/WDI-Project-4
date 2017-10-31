const router = require('express').Router();
const visited  = require('../controllers/visited');
const visionAPI  = require('../controllers/vision');
const wikiAPI  = require('../controllers/wiki');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/visited')
  .get(secureRoute, auth.profile)
  .post(secureRoute, visited.create);

router.route('/visited/:id')
  .delete(secureRoute, visited.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/profile')
  .get(secureRoute, auth.profile);

router.post('/vision', visionAPI.proxy);
router.get('/wiki', wikiAPI.proxy);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
