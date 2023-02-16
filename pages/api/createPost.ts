import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import con from "@/lib/server/db";
import mysql from "mysql";

const handler = nextConnect().post<NextApiRequest, NextApiResponse>(
  async (req, res) => {
    const postBody = req.body.postBody;
    const postTitle = req.body.postTitle;
    const posterName = req.body.posterName;
    var date = new Date();
    var mySqlDate = date.toISOString().slice(0, 19).replace("T", " ");

    var sql = `INSERT INTO posts (posterName, postTitle, postBody, postDate) VALUES ('${posterName}', '${postTitle}', '${postBody}', '${mySqlDate}')`;
    con.query(sql, function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
);

export default handler;
