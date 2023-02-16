import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import con from "@/lib/server/db";
import mysql from "mysql";

const handler = nextConnect().post<NextApiRequest, NextApiResponse>(
  async (req, res) => {
    const postId = req.body.postId;

    var sql = `DELETE FROM posts WHERE id='${postId}'`;
    con.query(sql, function (err, result) {
      console.log(result);
      if (err) {
        res.send(err);
      }
      res.send(result);
    });

    sql = `DELETE FROM postComments WHERE postId='${postId}'`;
    con.query(sql, function (err, result) {
      console.log(result);
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
);

export default handler;
