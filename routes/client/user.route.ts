import { Router, Request, Response } from "express";
import passport from 'passport';
import * as userController from "../../controllers/client/user.controller";
import * as validate from "../../validates/client/user.validate";
import * as authMiddleware from "../../middlewares/client/auth.middleware";
import { uploadSingle, uploadAvatar } from "../../middlewares/client/uploadCloud.middleware"; // Import uploadSingle và uploadAvatar

const router = Router();

router.get("/register", userController.register);
router.post("/register", validate.registerPost ,userController.registerPost);
router.get("/login", userController.login);
router.post("/login", validate.loginPost, userController.loginPost);
router.get("/logout", userController.logout);
router.get("/password/forgot", userController.forgotPassword);
router.post("/password/forgot", validate.forgotPasswordPost, userController.forgotPasswordPost);
router.get("/password/otp", userController.otpPassword);
router.post("/password/otp", userController.otpPasswordPost);
router.get("/password/reset", userController.resetPassword);
router.post("/password/reset", validate.resetPasswordPost ,userController.resetPasswordPost);
router.get("/info", authMiddleware.requireAuth ,userController.info);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }), (req: Request, res: Response) => {
    const user = req.user as any;
    if (user && user.tokenUser) {
        res.cookie("tokenUser", user.tokenUser);
    }
    res.redirect('/topics');
});

// Routes for editing user info
router.get("/edit", authMiddleware.requireAuth, userController.edit);
router.post("/edit", authMiddleware.requireAuth, uploadSingle, uploadAvatar, userController.editPost);

export const userRoutes: Router = router;