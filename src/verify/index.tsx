import axios from 'axios'
export type validatePayamentPropsType = {
    apiKey: string;
    tnxRef: string;
}

export type validatePayamentReturnType = {
  status: string;
  data: Object;
}

export async function validatePaystackPayment ({apiKey, tnxRef}: validatePayamentPropsType): Promise<validatePayamentReturnType>{

  const _res = (await axios.get(`https://api.paystack.co/transaction/verify/${tnxRef}`, {
    headers: {
      "Authorization" : "Bearer "+apiKey,
      'Content-Type': "application/json"
    }
  })).data

  return {
    status: _res.data.status,
    data: _res
  }
}