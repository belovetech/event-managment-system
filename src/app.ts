import express, { Application } from 'express';
import pino from 'pino-http';
import error from 'http-errors';
import { IRoute } from '@interfaces';
import { config } from '@config';
import { errorMiddleware } from '@middlewares';

export default class App {
  private app: Application;
  private port: number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.port;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.hadleGlobalErrorHandler();
  }

  public getServer(): Application {
    return this.app;
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info('====================================');
      console.info(`App listening on the port ${this.port}`);
      console.info('====================================');
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(pino());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private hadleGlobalErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach((route) => this.app.use('/api/v1', route.router));
  }
}
