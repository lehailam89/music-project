import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

//[GET] /admin/singers/
export const index = async (req: Request, res: Response) => {
    const singers = await Singer.find({
        deleted: false
    });

    res.render("admin/pages/singers/index", {
        pageTitle: "Quản lý ca sĩ",
        singers: singers
    })
};

//[GET] /admin/singers/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/singers/create", {
        pageTitle: "Thêm mới ca sĩ"
    });
};

//[POST] /admin/singers/create
export const createPost = async (req: Request, res: Response) => {
    const dataSinger = {
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        description: req.body.description,
        status: req.body.status,
    };
    const singer = await Singer.create(dataSinger);
    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
};