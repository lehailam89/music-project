"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userController = __importStar(require("../../controllers/client/user.controller"));
const validate = __importStar(require("../../validates/client/user.validate"));
const authMiddleware = __importStar(require("../../middlewares/client/auth.middleware"));
const uploadCloud_middleware_1 = require("../../middlewares/client/uploadCloud.middleware");
const router = (0, express_1.Router)();
router.get("/register", userController.register);
router.post("/register", validate.registerPost, userController.registerPost);
router.get("/login", userController.login);
router.post("/login", validate.loginPost, userController.loginPost);
router.get("/logout", userController.logout);
router.get("/password/forgot", userController.forgotPassword);
router.post("/password/forgot", validate.forgotPasswordPost, userController.forgotPasswordPost);
router.get("/password/otp", userController.otpPassword);
router.post("/password/otp", userController.otpPasswordPost);
router.get("/password/reset", userController.resetPassword);
router.post("/password/reset", validate.resetPasswordPost, userController.resetPasswordPost);
router.get("/info", authMiddleware.requireAuth, userController.info);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/user/login' }), (req, res) => {
    const user = req.user;
    if (user && user.tokenUser) {
        res.cookie("tokenUser", user.tokenUser);
    }
    res.redirect('/topics');
});
router.get("/edit", authMiddleware.requireAuth, userController.edit);
router.post("/edit", authMiddleware.requireAuth, uploadCloud_middleware_1.uploadSingle, uploadCloud_middleware_1.uploadAvatar, userController.editPost);
exports.userRoutes = router;
