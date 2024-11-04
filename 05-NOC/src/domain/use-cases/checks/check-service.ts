interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallback = ( error:string ) => void;

export class CheckService implements CheckServiceUserCase {
  constructor(
    private readonly successCallback: SuccessCallBack,
    private readonly errorCallback: ErrorCallback
  ) {

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if(!req.ok){
        throw new Error (`Error on check service ${ url} `);
    }

      this.successCallback();
      //console.log(`${ url} is ok`);
      return true;
    } catch (error) {
        //console.log(`${ error }`);

        this.errorCallback(`${ error }`);
        return true;
    }
  }
}
