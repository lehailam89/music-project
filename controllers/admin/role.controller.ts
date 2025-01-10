import Role from "../../models/role.model";
import { Request, Response } from "express";
import { systemConfig } from "../../config/config";

//[GET] /admin/roles/
export const index = async (req: Request, res: Response) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/index", {
        pageTitle: "Danh sách nhóm quyền",
        records: records,
    });
}

//[GET] /admin/roles/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền",
    });
};  

//[POST] /admin/roles/create
export const createPost = async (req: Request, res: Response) => {
    const record = new Role(req.body);
    await record.save();
    req.flash('success', 'Thêm mới nhóm quyền thành công!');
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);  
}

