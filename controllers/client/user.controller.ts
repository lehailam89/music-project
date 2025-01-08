import md5 from 'md5';
import User from '../../models/user.model';
import ForgotPassword from '../../models/forgot-password.model';
import { generateRandomNumber, generateRandomString } from '../../helpers/generate';
import { sendMail } from '../../helpers/sendMail';
import { Request, Response } from "express";

//[GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản",
    });
};
//[POST] /user/register
export const registerPost = async (req: Request, res: Response): Promise<void> => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if (existEmail) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/topics");
};

//[GET] /user/login
export const login = (req: Request, res: Response): void => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản"
    });
};

//[POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if(user.status === "inactive"){
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/topics");
}

//[GET] /logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
};

//[GET] /user/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
    res.render("client/pages/user/forgot-password", {
        title: "Quên mật khẩu"
    });
}

//[POST] /user/password/forgot
export const forgotPasswordPost = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    // Việc 1: Tạo mã OTP và lưu OTP, email vào collection forgot-password
    const otp = generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Việc 2: Gửi mã OTP qua email của user
    const subject = `Mã OTP để xác minh lấy lại mật khẩu`;
    const html = `
        Mã OTP của bạn là: <b>${otp}</b>. Luôn bảo mật mã này và không chia sẻ cho người khác, thời hạn sử dụng là 3 phút!!
    `;

    sendMail({email, subject, html});

    res.redirect(`/user/password/otp?email=${email}`);
};

//[GET] /user/password/otp
export const otpPassword = async (req: Request, res: Response) => {
    const email = req.query.email;
   
    res.render("client/pages/user/otp-password", {
        title: "Nhập mã OTP",
        email: email
    });
}