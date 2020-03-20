/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const { join } = require('path');
const { AccessToken } = require('twilio').jwt;
require('dotenv').config();

const { VideoGrant } = AccessToken;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = express();

  server.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', '/service-worker.js');

    app.serveStatic(req, res, filePath);
  });

  server.get('/token', (req, res) => {
    const { identity, roomName } = req.query;
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
    res.send(token.toJwt());
    console.log(`issued token for ${identity} in room ${roomName}`);
  });

  server.all('*', async (req, res) => {
    return handle(req, res);
  });

  server.listen(port, error => {
    if (error) throw error;
    console.log(`> Server ready on port: ${port}`);
  });
});
