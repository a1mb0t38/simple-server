import { Router, type NextFunction, type Request, type Response} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";



const router = Router()




router.post("/", userController.createUser);

router.get("/", auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), userController.getUser)


router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), userController.getUserById)

router.put("/:id", auth(USER_ROLE.admin, USER_ROLE.user), userController.UpdateUserById)

export const userRoute = router