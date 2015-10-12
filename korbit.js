'use strict';

var needle = require('needle');
var _ = require('lodash');

/**
  * Korbit API wrapper
  * @param {String} apiKey
  * @param {String} secretKey
**/

class Korbit {

  constructor(clientID, clientSecret, userName, userPassword){
    this.config = {
      url : 'https://api.korbit.co.kr/',
      version : 'v1',
      timeoutMS : 18000
    };

    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.userName = userName;
    this.userPassword = userPassword;

    if(_.isEmpty(this.accessToken)){
      this.authorize();
    }
  }

  /*
   * PUBLIC METHOD
   */

  ticker (isDetailed, callback){
    if(isDetailed == true)
      return this.requestPublicAPI('/ticker/detailed', callback);
    else
      return this.requestPublicAPI('/ticker', callback);
  }

  orderbook (params, callback){
    var parameters = {
      group : params.group ? params.group : true,
      category : params.group ? params.category : 'all'
    };

    return this.requestPublicAPI('/orderbook', parameters, callback);
  }

  transactions (params, callback){
    var parameters = {
      time : params.time ? params.time : 'hour'
    };

    return this.requestPublicAPI('/transactions', parameters, callback);
  }

  constants (callback){
    return this.requestPublicAPI('/constants', callback);
  }

  /*
   * PRIVATE METHOD
   */

  /* AUTH METHOD */
  authorize(callback) {
    return this.requestPrivateAPI('POST', 'oauth2/access_token');
  }

  refreshToken(callback) {
    return this.requestPrivateAPI('POST', 'oauth2/access_token');
  }

  /* USER METHOD */
  getInfo (callback) {
    return this.requestPrivateAPI('GET', 'user/info');
  }

  bidOrder (params, callback){
    return this.requestPrivateAPI('POST', 'user/orders/buy', params);
  }

  askOrder (params, callback){
    return this.requestPrivateAPI('POST', 'user/orders/sell', params);
  }

  cancelOrder(params, callback){
    return this.requestPrivateAPI('POST', 'user/orders/cancel', params);
  }

  listOrders(callback){
    return this.requestPrivateAPI('GET', 'user/orders/open');
  }

  transactionHistory(params, callback){
    return this.requestPrivateAPI('GET', 'user/transaction');
  }


  /* FIAT METHOD */

  setVirtualBank(params, callback){
    return this.requestPrivateAPI('POST', 'user/fiats/address/assign');
  }

  setBankAccount(params, callback){
    return this.requestPrivateAPI('POST', 'user/fiats/address/register', params);
  }

  requestWithdrawal(params, callback){
    return this.requestPrivateAPI('POST', 'user/fiats/out', params);
  }

  withdrawalStatus(callback){
    return this.requestPrivateAPI('GET', 'user/fiats/status');
  }

  cancelWithdrawal(params, callback){
    return this.requestPrivateAPI('POST', 'user/fiats/out/cancel', params);
  }


  /* WALLET METHOD */

  getWalletStatus(callback){
    return this.requestPrivateAPI('POST', 'user/wallet');
  }

  assignWalletAddr(params, callback){
    return this.requestPrivateAPI('POST', 'user/conins/address/assign', params);
  }

  requestBTCWithdrawal(params, callback){
    return this.requestPrivateAPI('POST', 'user/coins/out', params);
  }

  btcWithdrawalStatus(callback){
    return this.requestPrivateAPI('GET', 'user/coins/status');
  }

  cancelBTCWithdrawal(params, callback){
    return this.requestPrivateAPI('POST', 'user/coins/out/cancel');
  }

  /*
   * UTILITY METHOD
   */

  generateNonce(){
    var now = new Date().getTime();

    if(now !== this.last)
      this.nonceIncr = -1;

    this.last = now;
    this.nonceIncr++;

    var noncePadding = this.nonceIncr < 10 ? '000' : this.nonceIncr < 100 ? '00' : this.nonceIncr < 1000 ? '0' : '';

    return now + noncePadding + this.nonceIncr;
  }

  requestPublicAPI (path, params, callback){
    if(typeof callback === undefined){
      callback = params;
    }
    needle.get(this.config.url + this.config.version + path, params, function(err, response){
      if(err)
        console.log(err);
      else
        console.log(response.body);
    });
  }

  requestPrivateAPI (method, path, params, callback){
    var headers = {
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + config.apiKey
    }
    if(_.isEmpty(this.config.clientID) || _.isEmpty(this.config.clientSecret))
      return console.log("Missing Parameters");

    if(_.isEmpty(this.config.accessToken)){
      //TODO
    }
  }
}

module.exports = Korbit;