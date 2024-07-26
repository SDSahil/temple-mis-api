import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { AuthValidator } from "../middlewares/authValidator.js";

export class UserRoute {
    constructor() {
        this.route = Router();
        this.userController = new UserController();
        this.authValidator = new AuthValidator();
        this.handleRoute();
    }

    handleRoute() {
        this.route.post('/login', this.userController.userLogin);
        this.route.post('/signup', this.userController.createUser);
        this.route.get('/check-phone', this.userController.getUserByPhone);
        this.route.post('/test-str', this.userController.authCheck);
        this.route.get('/current-user', this.authValidator.validateToken, this.userController.getCurrUser);
        // this.route.get('/test-auth', this.authValidator.validateToken, this.userController.authCheck);
    }

    getRoute() {
        return this.route;
    }
}