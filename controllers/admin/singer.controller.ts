import { Request, Response } from "express";
import Singer from "../../models/singer.model";

//[GET] /singers/
export const index = async (req: Request, res: Response) => {
    const singers = await Singer.find({
        deleted: false
    });

    res.render("admin/pages/singers/index", {
        pageTitle: "Quản lý ca sĩ",
        singers: singers
    })
};