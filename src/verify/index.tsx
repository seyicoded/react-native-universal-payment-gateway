
type validatePayamentPropsType = {
    apiKey: string;
    tnxRef: string;
  }
  
  type validatePayamentReturnType = {
    status: boolean;
  }

export function validatePaystackPayment ({apiKey, tnxRef}: validatePayamentPropsType): validatePayamentReturnType{
  
    return {
      status: false
    }
}