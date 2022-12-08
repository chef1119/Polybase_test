import Web3 from 'web3';
import { addresses } from './constants';
import CoinStreamer from "./contracts/CoinStreamer";
import Bep20Standard from "./contracts/Bep20Standard";
import { NumToBN } from './utils';

export default class Web3Wrapper {

  web3: Web3;
  chainId: number;
  account: string;
  wrapperOptions: any;

  // Contracts
  coinStreamer: CoinStreamer;
  bep20Standard: Bep20Standard;

  constructor(web3, chainId, account, options = {}) {
    this.web3 = web3;
    this.chainId = chainId;
    this.account = account;

    this.wrapperOptions = {
      web3, chainId, account,
      ...options
    }
    this.coinStreamer = new CoinStreamer(this.wrapperOptions, addresses.coinStreamer[this.chainId]);
    this.bep20Standard = new Bep20Standard(this.wrapperOptions, "");
  }

  async sendBNB(_recipent, _amount, _duration, _streams) {
    let amount = NumToBN(parseFloat(_amount));
    await this.coinStreamer.send("getBNB", {value:amount.toString()}, _recipent, amount.toString(), _duration, parseInt(_streams));
  }

  async sendToken(_recipent, _tokenAddr, _amount, _duration, _streams) {
    this.bep20Standard = new Bep20Standard(this.wrapperOptions, _tokenAddr);
    let amount = NumToBN(parseFloat(_amount));
    await this.bep20Standard.send("approve", {}, addresses.coinStreamer[this.chainId], amount.toString());
    await this.coinStreamer.send("getToken", {}, _recipent, _tokenAddr, amount.toString(), _duration, parseInt(_streams));
  }
}
