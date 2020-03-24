const Cookies = require('cookies');

module.exports = (req, res) => {
  const cookies = new Cookies(req, res, {
    keys: ['identity']
  });

  let { identity } = req.query;

  if (identity) {
    cookies.set('identity', identity, {
      overwrite: true
    });
  } else {
    identity = cookies.get('identity');
  }

  return res.send(JSON.stringify({ identity }));
};
