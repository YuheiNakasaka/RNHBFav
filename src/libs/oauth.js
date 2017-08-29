import MyOAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import qs from 'qs';
import { sleep, alert } from './utils';

class OAuth {
  constructor(options) {
    this.method = options.method; // required
    this.consumerKey = options.consumerKey; // required
    this.consumerSecret = options.consumerSecret; // required
    this.oauthVerifier = '';

    this.requestTokenUrl = options.requestTokenUrl;
    this.authorizeUrl = options.authorizeUrl;
    this.accessTokenUrl = options.accessTokenUrl;
    this.callbackUrl = options.callbackUrl;

    this.oauth = MyOAuth({
      consumer: {
        key: this.consumerKey,
        secret: this.consumerSecret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(baseString, key) {
        return Base64.stringify(crypto.HmacSHA1(baseString, key));
      },
    });
  }

  request(method, url, accessToken, accessTokenSecret, options = {}) {
    const requestData = {
      url,
      method,
      data: options,
    };

    const token = {
      key: accessToken,
      secret: accessTokenSecret,
    };
    requestData.headers = this.oauth.toHeader(this.oauth.authorize(requestData, token));

    if (method.toUpperCase() !== 'GET') {
      requestData.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      requestData.headers['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,HEAD,OPTIONS';
    }

    return fetch(`${url}?${qs.stringify(requestData.data)}`, {
      method: requestData.method,
      headers: requestData.headers,
    }).then((resp) => {
      if (resp._bodyText.match(/^401 Unauthorized/)) {
        alert('Authorization Error', 'セッションが切れました。ログインし直して下さい。');
        return {};
      }
      if (resp._bodyText !== '') return resp.json();
      return {};
    }).catch((e) => {
      console.log(e);
      console.log('Error Occuered: request');
    });
  }

  getRequestToken() {
    const requestData = {
      url: `${this.requestTokenUrl}?scope=${encodeURIComponent('read_public,write_public,read_private,write_private')}`,
      method: this.method,
      data: {
        oauth_callback: this.callbackUrl,
      },
    };
    requestData.headers = this.oauth.toHeader(this.oauth.authorize(requestData, {}));
    requestData.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return fetch(requestData.url, {
      method: requestData.method,
      headers: requestData.headers,
    }).then(response => this._setRequestTokens(response._bodyText)).then(() => `${this.authorizeUrl}?oauth_token=${encodeURIComponent(this.requestToken)}`)
      .catch((e) => {
        console.log('Error Occured: getRequestToken');
        console.log(e.message);
      });
  }

  getAccessToken(url) {
    this._setOAuthVarifier(url);

    const requestData = {
      url: `${this.accessTokenUrl}`,
      method: this.method,
      data: {
        oauth_verifier: this.oauthVerifier,
      },
    };

    const token = {
      key: this.requestToken,
      secret: this.tokenSecret,
    };

    requestData.headers = this.oauth.toHeader(this.oauth.authorize(requestData, token));
    requestData.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return fetch(requestData.url, {
      method: requestData.method,
      headers: requestData.headers,
    }).then((response) => {
      sleep(2000);
      return this._parseAccessTokenResponse(response._bodyText);
    }).catch(() => {
      console.log('Error Occured: getAccessToken');
    });
  }

  _setRequestTokens(text) {
    text.split('&').map((o) => {
      const query = o.split('=');
      if (query[0] === 'oauth_token') {
        this.requestToken = decodeURIComponent(query[1]);
      }
      if (query[0] === 'oauth_token_secret') {
        this.tokenSecret = decodeURIComponent(query[1]);
      }
    });
  }

  _setOAuthVarifier(text) {
    const matched = text.match(/oauth_verifier=(.+)/);
    if (matched !== null) {
      this.oauthVerifier = matched[1];
    }
  }

  _parseAccessTokenResponse(text) {
    const obj = {};
    text.split('&').map((query) => {
      const arr = query.split('=');
      obj[`${arr[0]}`] = decodeURIComponent(arr[1]);
    });
    return obj;
  }
}

export default OAuth;
