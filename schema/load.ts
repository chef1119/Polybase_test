require('dotenv').config();
import { Polybase } from '@polybase/client'
import Wallet from 'ethereumjs-wallet'
import { ethPersonalSign } from '@polybase/eth'

// PK, need to establish a PK so we can control updates

const schema = `
collection Submissions {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  payment: string;

  constructor (id: string, firstname: string, lastname: string, email: string, address: string, city: string, state: string, zip: string, country: string, payment: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
    this.payment = payment;
  }
}
`

const PRIVATE_KEY = process.env.SECRET?.trim() ?? ''

async function load () {
  const db = new Polybase({
    // baseURL: `${process.env.REACT_APP_API_URL?.trim()}/v0`,
    signer: async (data) => {
      const wallet = Wallet.fromPrivateKey(Buffer.from(PRIVATE_KEY, 'hex'))
      return { h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    },
  })
  // const db = new Polybase({
  //   defaultNamespace: "your-namespace"
  // })

  // var wallet = Wallet.fromPrivateKey(Buffer.from(PRIVATE_KEY, 'hex'))

  // db.signer((data) => {
  //   return { 
  //     h: 'eth-personal-sign', 
  //     sig: ethPersonalSign(wallet.getPrivateKey(), data),
  //   }
  // })

  if (!PRIVATE_KEY) {
    throw new Error('No private key provided')
  }

  await db.applySchema(schema, "submit_test")
  // await db.collection('submissions2').create(['a','a','a','a','a','a','a','a','a'])
  console.log(db);

  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)
