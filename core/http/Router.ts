import IndexController from "../controller/IndexController"
import UserController from "../controller/UserController"
import HttpServer from "./HttpServer"

export default class Router {

	static apiPrefix = "/api/v1"

	constructor(
		private indexController: IndexController,
		private userController: UserController
	) {}

	registerRoutes(server: HttpServer) {

		const prefix = Router.apiPrefix

		server.get(prefix + "/ok", this.indexController.ok)

		server.post(prefix + "/user/auth", this.userController.login)

	}

}