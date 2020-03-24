const Cookies = require('cookies');

module.exports = (req, res) => {
  const cookies = new Cookies(req, res, {
    keys: ['identity', 'generalToken', 'privateToken']
  });

  cookies.set('identity', null, {
    overwrite: true
  });

  cookies.set('generalToken', null, {
    overwrite: true
  });

  cookies.set('privateToken', null, {
    overwrite: true
  });

  return res.send(JSON.stringify({ completed: true }));
};
