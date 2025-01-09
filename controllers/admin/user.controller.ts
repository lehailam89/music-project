import { Request, Response } from "express";
import User from "../../models/user.model";
import { systemConfig } from "../../config/config";

//[GET] /admin/users/
export const index = async (req: Request, res: Response) => {
    const users = await User.find({
        deleted: false
    });

    res.render("admin/pages/users/index", {
        pageTitle: "Quản lý người dùng",
        users: users
    })
}