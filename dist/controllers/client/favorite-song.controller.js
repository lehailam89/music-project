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
exports.index = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({ tokenUser: userId }).populate('favoriteMusic');
    if (!user) {
        res.status(401).send('User not found');
        return;
    }
    const favoriteSongs = user.favoriteMusic;
    for (const item of favoriteSongs) {
        const song = yield songs_model_1.default.findOne({
            _id: item._id,
            deleted: false
        }).lean();
        if (song) {
            item.infoSong = song;
            item.infoSong.isFavoriteSong = true;
        }
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song === null || song === void 0 ? void 0 : song.singerId,
            deleted: false
        }).lean();
        if (infoSinger) {
            item.infoSinger = infoSinger;
        }
    }
    res.render("client/pages/favorite-songs/index", {
        pageTitle: "Favorite Songs",
        favoriteSongs: favoriteSongs
    });
});
exports.index = index;
