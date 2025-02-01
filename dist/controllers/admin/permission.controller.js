"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsPatch = exports.permissions = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const permissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield role_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records,
    });
});
exports.permissions = permissions;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        yield role_model_1.default.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        });
    }
    req.flash("success", "Phân quyền thành công");
    res.redirect("back");
});
exports.permissionsPatch = permissionsPatch;
