import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
// import { Routes } from "./routes";
import userRoutes from "./routes";
import { User } from "./entity/User";
require("dotenv").config();
const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express.default();
    app.use(bodyParser.json());
    app.use("/api/user", userRoutes);

    // register express routes from defined application routes
    // Routes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next
    //       );
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.send(result)
    //             : undefined
    //         );
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result);
    //       }
    //     }
    //   );
    // });

    // setup express app here
    // ...

    // start express server
    const start = async () => {
      try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
      } catch (e) {
        console.log(e);
      }
    };

    start();
  })
  .catch((error) => console.log(error));
