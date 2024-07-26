import { Router } from "express";
import { UserRoute } from "./userRoute.js";

export class Routes {
  constructor() {
    this.router = Router();
    this.userRoute = new UserRoute();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // this.router.get('/', this.homeHandler);
    this.router.use('/users', this.userRoute.getRoute());
  }

  // homeHandler(req, res) {
  //   res.send('Hello, World!');
  // }

  getRouter() {
    return this.router;
  }
}
