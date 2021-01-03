import mongoose from "mongoose";
import {dbCodes, dbErrorCodes} from "../../logging-codes/loggingCodes";
import { factory } from "../ConfigLog4j";
import dotEnv from 'dotenv';

dotEnv.config()
const logger = factory.getLogger("database.mongo");

export default new (class MongoDb {

  private readonly connectionUrl: string = process.env.CUSTOMCONNSTR_MONGODB_URL ? process.env.CUSTOMCONNSTR_MONGODB_URL :  "";

  async connect() {
    logger.info(dbCodes.INITIALIZING_DB);
    try {
      await mongoose.connect(this.connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      logger.info(dbCodes.SUCCESS_DB_CONNECTION);
      return mongoose;
    } catch (err) {
      logger.info(dbErrorCodes.ERROR_DB_INITIALIZATION);
    //  TODO -> Shall I re-throw another Error here
    }
  }
})();
