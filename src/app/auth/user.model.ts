export class User{
   constructor(public email: string, public id: string, public _token: string, public _expiration: Date){}

   get token(): string | null {
      if(!this._expiration || new Date() > this._expiration){
         return null;
      }
      return this._token;
   }
}