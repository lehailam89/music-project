import { Request, Response } from 'express';
import Topic from '../../models/topic.model';
import Song from '../../models/songs.model';
import Singer from '../../models/singer.model';

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

    console.log(songs);

    res.render('client/pages/songs/list', {
        pageTitle: "Danh sách bài hát",
        songs: songs // Thêm biến songs vào render
    });
}