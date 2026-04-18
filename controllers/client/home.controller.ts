import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";

// [GET] /
export const index = async (req: Request, res: Response): Promise<void> => {
    const topics = await Topic.find({
        status: "active",
        deleted: false
    })
        .select("title slug avatar description")
        .limit(6)
        .lean();

    const songs = await Song.find({
        status: "active",
        deleted: false
    })
        .select("title slug avatar singerId")
        .sort({ _id: -1 })
        .limit(8)
        .lean();

    for (const song of songs) {
        const singer = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        })
            .select("fullName")
            .lean();

        (song as any).singer = singer;
    }

    res.render("client/pages/home/index", {
        pageTitle: "Trang chu",
        topics,
        songs
    });
};
