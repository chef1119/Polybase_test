import Contract from './Contract';
import abi from '../abi/bep20abi.json';

class Bep20Standard extends Contract {
    constructor(options, address) {
        super(options, "Bep20Standard", abi, address);
    }
}

export default Bep20Standard;