import { Request, Response } from "express";
import Account from "../../models/account.model";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

//[GET] /admin/accounts/
export const index = async (req: Request, res: Response) => {
    const records = await Account.find({
        deleted: false
    });

    const accountsWithRoles = [];

    for (const record of records) {
        const role = await Role.findOne({ _id: record.role_id });
        const accountWithRole = {
            ...record.toObject(),
            role: role
        };
        accountsWithRoles.push(accountWithRole);
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: accountsWithRoles,
    });
}

//[GET] /admin/accounts/create
export const create = async (req: Request, res: Response) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles,
    });
};