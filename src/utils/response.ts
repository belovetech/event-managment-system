export class SuccessResponse {
  //   success: boolean;
  status: number;
  message: string;
  data: any;

  constructor(message: string, data: any) {
    // this.success = true;
    this.status = 200;
    this.message = message;
    this.data = data;
  }
}
