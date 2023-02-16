import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import con from "@/lib/server/db";
import mysql from "mysql";

const handler = nextConnect().post<NextApiRequest, NextApiResponse>(
  async (req, res) => {
    const postBody = req.body.postBody;
    const posterName = req.body.posterName;
    const postId = req.body.postId;

    console.log(postBody);
    console.log(posterName);
    console.log(postId);
    var date = new Date();
    var mySqlDate = date.toISOString().slice(0, 19).replace("T", " ");

    var sql = `INSERT INTO postComments (posterName, posterBody, posterDate, postId) VALUES ('${posterName}', '${postBody}', '${mySqlDate}', '${postId}')`;
    con.query(sql, function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
);

export default handler;
