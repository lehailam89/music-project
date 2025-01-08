import { Request, Response, NextFunction } from "express";

export const registerPost = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.fullName) {
        req.flash("error", "Họ tên không được để trống!");
        res.redirect("back");
        return;
    }
    if (!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
};

export const loginPost = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
};

export const forgotPasswordPost = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    next();
};

export const resetPasswordPost = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    if (!req.body.confirmPassword) {
        req.flash("error", "Vui lòng nhập lại mật khẩu!");
        res.redirect("back");
        return;
    }

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Xác nhận mật khẩu không đúng!");
        res.redirect("back");
        return;
    }

    next();
};