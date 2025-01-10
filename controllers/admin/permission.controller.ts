import Role from "../../models/role.model";
import { Request, Response } from "express";
import { systemConfig } from "../../config/config";

//[GET] /admin/permissions
export const permissions = async (req: Request, res: Response) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records,
    });
}

//[PATCH] /admin/permissions
export const permissionsPatch = async (req: Request, res: Response) => {
    const permissions = JSON.parse(req.body.permissions);
   
    for (const item of permissions) {
        await Role.updateOne(
            {
                _id: item.id
            },
            {
                permissions: item.permissions
            }
        );
    }

    req.flash("success", "Phân quyền thành công");
    res.redirect("back");
}
