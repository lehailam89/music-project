"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordPost = exports.forgotPasswordPost = exports.loginPost = exports.registerPost = void 0;
const registerPost = (req, res, next) => {
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
exports.registerPost = registerPost;
const loginPost = (req, res, next) => {
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
exports.loginPost = loginPost;
const forgotPasswordPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    next();
};
exports.forgotPasswordPost = forgotPasswordPost;
const resetPasswordPost = (req, res, next) => {
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
exports.resetPasswordPost = resetPasswordPost;
