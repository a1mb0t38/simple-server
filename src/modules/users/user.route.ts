import { Router, type NextFunction, type Request, type Response} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";



const router = Router()



router.post("/", userController.createUser);

router.get("/", auth("admin", "agent"), userController.getUser)


router.get("/:id", userController.getUserById)

router.put("/:id", userController.UpdateUserById)

export const userRoute = router