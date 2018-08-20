import crypto from 'crypto';

export default (value = '') => crypto.createHmac('sha256', process.env.CRYPTO_KEY)
  .update(value)
  .digest('hex');
