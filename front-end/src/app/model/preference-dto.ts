export class PreferenceDto {
  initPoint:string;
  sandboxInitPoint:string;
  notificationUrl:string;

  constructor(initPoint:string, sandboxInitPoint:string, notificationUrl:string){
    this.initPoint=initPoint;
    this.sandboxInitPoint=sandboxInitPoint;
    this.notificationUrl=notificationUrl;
  }
}
