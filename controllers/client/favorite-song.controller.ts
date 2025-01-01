import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";

// GET /favorite-songs
export const index = async (req: Request, res: Response): Promise<void> => {
  const favoriteSongs = await FavoriteSong.find({
    // userId: "",
    deleted: false
  }).lean();

  for (const item of favoriteSongs) {
    const infoSong = await Song.findOne({
      _id: item.songId,
      deleted: false
    }).lean();

    if (infoSong) {
      (item as any).infoSong = infoSong;
      const infoSinger = await Singer.findOne({
        _id: infoSong.singerId,
        deleted: false
      }).lean();

      if (infoSinger) {
        (item as any).infoSinger = infoSinger;
      }
    }
  }

  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Favorite Songs",
    favoriteSongs: favoriteSongs
  });
};