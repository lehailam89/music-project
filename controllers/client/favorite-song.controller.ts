import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import User from "../../models/user.model";

// GET /favorite-songs
export const index = async (req: Request, res: Response): Promise<void> => {
  const userId = req.cookies.tokenUser;

  const user = await User.findOne({ tokenUser: userId }).populate('favoriteMusic');

  if (!user) {
    res.status(401).send('User not found');
    return;
  }

  const favoriteSongs = user.favoriteMusic;

  for (const item of favoriteSongs) {
    const song = await Song.findOne({
      _id: item._id,
      deleted: false
    }).lean();

    if (song) {
      (item as any).infoSong = song;
      (item as any).infoSong.isFavoriteSong = true; // Gán giá trị isFavoriteSong
    }

    const infoSinger = await Singer.findOne({
      _id: song?.singerId,
      deleted: false
    }).lean();

    if (infoSinger) {
      (item as any).infoSinger = infoSinger;
    }
  }

  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Favorite Songs",
    favoriteSongs: favoriteSongs
  });
};