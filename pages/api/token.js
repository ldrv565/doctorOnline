const { AccessToken } = require('twilio').jwt;

const Cookies = require('cookies');

const { VideoGrant } = AccessToken;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const getTokenWithGrant = (identity, roomName) => {
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKeySID,
    twilioApiKeySecret,
    {
      ttl: MAX_ALLOWED_SESSION_DURATION
    }
  );

  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);

  return token.toJwt();
};

module.exports = (req, res) => {
  const { identity, roomName } = req.query;

  const isCheck = identity?.split('.')[0] === 'check';

  if (isCheck) {
    const token = getTokenWithGrant(identity, roomName);
    return res.send(JSON.stringify({ token }));
  }

  const cookies = new Cookies(req, res, {
    keys: ['generalToken', 'privateToken']
  });

  const tokenType = {
    room: 'generalToken',
    [identity]: 'privateToken'
  };

  let token = cookies.get(tokenType[roomName]);

  if (!token) {
    token = getTokenWithGrant(identity, roomName);
    cookies.set(tokenType[roomName], token);
  }

  return res.send(JSON.stringify({ token }));
};
