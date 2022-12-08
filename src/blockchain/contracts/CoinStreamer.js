import Contract from './Contract';
import abi from '../abi/coinstreamer.json';

class CoinStreamer extends Contract {
    constructor(options, address) {
        super(options, "CoinStreamer", abi, address);
    }
}

export default CoinStreamer;