const { AccessToken } = require('twilio').jwt;
// const Video = require('twilio-video');

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

module.exports = async (req, res) => {
  const { identity, roomName } = req.query;

  const token = getTokenWithGrant(identity, roomName);

  res.send(JSON.stringify({ token }));
};
