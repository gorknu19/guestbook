import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import con from "@/lib/server/db";
import mysql from "mysql";

const handler = nextConnect().post<NextApiRequest, NextApiResponse>(
  async (req, res) => {
    const postBody = req.body.postBody;
    const postTitle = req.body.postTitle;
    const posterName = req.body.posterName;
    const postId = req.body.postId;

    console.log(postId);
    var date = new Date();
    var mySqlDate = date.toISOString().slice(0, 19).replace("T", " ");

    var sql = `UPDATE posts SET postTitle='${postTitle}', postBody='${postBody}', postDate='${mySqlDate}' WHERE id='${postId}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
);

export default handler;
