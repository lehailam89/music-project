import { Request, Response } from 'express';
import Topic from '../../models/topic.model';
import Song from '../../models/songs.model';
import Singer from '../../models/singer.model';
import FavoriteSong from '../../models/favorite-song.model';

//[GET] /songs/:slugTopic
export const list = async (req: Request, res: Response): Promise<void> => {
    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });

    if (!topic) {
        res.status(404).send('Topic not found');
        return;
    }
    
    const songs = await Song.find({
        topicId: topic._id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like").lean();

    for(const song of songs){
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });

        (song as any).infoSinger = infoSinger; 
    }

    res.render('client/pages/songs/list', {
        pageTitle: "Danh sách bài hát",
        songs: songs // Thêm biến songs vào render
    });
}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response): Promise<void>  => {
    const slugSong: string = req.params.slugSong;
    const song = await Song.findOne({
      slug: slugSong,
      status: "active",
      deleted: false
    });
    if (!song) {
        res.status(404).send('Song not found');
        return;
    }

    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    }).select("fullName");
    const topic = await Topic.findOne({
      _id: song.topicId,
      status: "active",
      deleted: false
    }).select("title");

    const favoriteSong = await FavoriteSong.findOne({
        songId: song.id
    });

    (song as any).isFavoriteSong = favoriteSong ? true : false;

    res.render("client/pages/songs/detail", {
      pageTitle: "Chi tiết bài hát",
      song,
      singer,
      topic
    })
  }

// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong;
    const typeLike: string = req.params.typeLike;

    const song = await Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });

    if (!song || song.like === null || song.like === undefined) {
        res.status(404).send('Song not found or like count is invalid');
        return;
    }

    const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1; 
        await Song.updateOne({
            _id: idSong,
        },{
            like: newLike
        });
    

    res.json({
        code: 200,
        message: "Thành công!!",
        like: newLike
    })
}

// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong;
    const typeFavorite: string = req.params.typeFavorite;

    switch (typeFavorite) {
        case "favorite":
            const existFavorite = await FavoriteSong.findOne({
                songId: idSong,
            });
            if(!existFavorite){
                const record = new FavoriteSong({
                    // userId: "",
                    songId: idSong
                });
                await record.save();
            }
            break;
        case "unfavorite":
            await FavoriteSong.findOneAndDelete({
                songId: idSong
            });
            break;
            default:
            break;
        }


    res.json({
        code: 200,
        message: "Thành công!"
    })
}

// [PATCH] /songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {  
    const idSong: String = req.params.idSong;

    const song = await Song.findOne({
        _id: idSong
    });

    const listen: number = (song?.listen ?? 0) + 1;

    await Song.updateOne({
        _id: idSong
    },{
        listen: listen
    });

    const songNew = await Song.findOne({
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
    }