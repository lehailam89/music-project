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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });
    if (!topic) {
        res.status(404).send('Topic not found');
        return;
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const totalSongs = yield songs_model_1.default.countDocuments({
        topicId: topic._id,
        status: "active",
        deleted: false
    });
    const totalPages = Math.ceil(totalSongs / limit);
    const songs = yield songs_model_1.default.find({
        topicId: topic._id,
        status: "active",
        deleted: false
    })
        .select("avatar title slug singerId like").skip(skip)
        .limit(limit)
        .lean();
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song.infoSinger = infoSinger;
    }
    res.render('client/pages/songs/list', {
        pageTitle: "Danh sách bài hát",
        songs: songs,
        currentPage: page,
        totalPages: totalPages
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield songs_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    });
    if (!song) {
        res.status(404).send('Song not found');
        return;
    }
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");
    const userId = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({ tokenUser: userId });
    if (user && user.favoriteMusic.includes(song._id)) {
        song.isFavoriteSong = true;
    }
    else {
        song.isFavoriteSong = false;
    }
    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song,
        singer,
        topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield songs_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    if (!song || song.like === null || song.like === undefined) {
        res.status(404).send('Song not found or like count is invalid');
        return;
    }
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield songs_model_1.default.updateOne({
        _id: idSong,
    }, {
        like: newLike
    });
    res.json({
        code: 200,
        message: "Thành công!!",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    const userId = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({ tokenUser: userId });
    if (!user) {
        res.status(401).send('User not found');
        return;
    }
    const song = yield songs_model_1.default.findOne({ _id: idSong });
    if (!song) {
        res.status(404).send('Song not found');
        return;
    }
    const songObjectId = new mongoose_1.default.Types.ObjectId(idSong);
    const userObjectId = new mongoose_1.default.Types.ObjectId(user._id);
    switch (typeFavorite) {
        case "favorite":
            if (!user.favoriteMusic.includes(songObjectId)) {
                user.favoriteMusic.push(songObjectId);
                song.likedBy.push(userObjectId);
            }
            break;
        case "unfavorite":
            user.favoriteMusic = user.favoriteMusic.filter((songId) => songId.toString() !== idSong);
            song.likedBy = song.likedBy.filter((userId) => userId.toString() !== user._id.toString());
            break;
        default:
            break;
    }
    yield user.save();
    yield song.save();
    res.json({
        code: 200,
        message: "Thành công!"
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idSong = req.params.idSong;
    const song = yield songs_model_1.default.findOne({
        _id: idSong
    });
    const listen = ((_a = song === null || song === void 0 ? void 0 : song.listen) !== null && _a !== void 0 ? _a : 0) + 1;
    yield songs_model_1.default.updateOne({
        _id: idSong
    }, {
        listen: listen
    });
    const songNew = yield songs_model_1.default.findOne({
        _id: idSong
    });
    if (!songNew) {
        res.status(404).send('Song not found');
        return;
    }
    res.json({
        code: 200,
        message: "Thành công!",
        listen: songNew.listen
    });
});
exports.listen = listen;
