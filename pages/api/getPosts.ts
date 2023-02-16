import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import con from "@/lib/server/db";
import mysql from "mysql";

const handler = nextConnect().get<NextApiRequest, NextApiResponse>(
  async (req, res) => {
    var sql = `SELECT * FROM posts`;
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
