import Account from "../../models/account.model";
import md5 from "md5";
import { Request, Response } from "express";
import { systemConfig } from "../../config/config";

//[GET] /auth/login
export const login = (req: Request, res: Response) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập"
    });
}

//[POST] /auth/login
export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash("error", "Tài khoản không tồn tại");
        res.redirect("back");
        return;
    }
    if(md5(password) !== user.password) {
        req.flash("error", "Mật khẩu không chính xác");
        res.redirect("back");
        return;
    }
    if(user.status == "inactive") {
        req.flash("error", "Tài khoản đang bị khoá");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

//[GET] /auth/logout
export const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}