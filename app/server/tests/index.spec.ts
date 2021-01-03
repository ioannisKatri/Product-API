import createApp from "../createApp";
import request from "supertest";
import mongoose, {ConnectionOptions, Model, Mongoose} from 'mongoose';
import {factory} from "../../configurations/ConfigLog4j";
import database from "../../configurations/database/mongoDb";
import productModel from "../model/product";

require('dotenv').config()
let connection: Mongoose;
const logger = factory.getLogger("database.mongo");
const db = database;

jest.useFakeTimers()

describe("Tests the server", () => {

    beforeAll(async done => {
        // const consoleLogSpyOn = jest.spyOn(logger, 'info');
        // const mongooseConnectSpyOn = jest
        //     .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
        //     .mockImplementationOnce((uris: string, options?: ConnectionOptions, callback?: (err?: mongoose.Error) => void) => {
        //         if (callback) {
        //             callback();
        //             done();
        //         }
        //         return Promise.resolve(mongoose);
        //     });
        //
        // await db.connect();


        // let connection = process.env.CUSTOMCONNSTR_MONGODB_URL ? process.env.CUSTOMCONNSTR_MONGODB_URL :  "";
        // expect(consoleLogSpyOn).toBeCalledWith('Database Initialization starting');
        // expect(mongooseConnectSpyOn).toBeCalledWith(connection
        //     ,
        //     {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //         useCreateIndex: true,
        //     },
        // );
    });

    test('should return true given foo', () => {
        expect(true).toBe(true)
    })

    it("Application main page works", async () => {
        let app = await createApp();
        request(app)
            .get('/')
            .expect(200)
            .end(() => {
            });
    })

    // it("Return product by providing specific ID", async (done) => {
    //     // JEST will mock the db query so you never hit the database
    //     // instead when the test makes the query it revceives a hardcoded value
    //     const product = {
    //         name: "John",
    //     };
    //
    //     const spy = jest.spyOn(productModel, 'findById').mockReturnValueOnce(product as any);
    //     // productModel.findById("222")
    //     const app = await createApp();
    //     const a = request(app).get('/product/222')
    //         .expect(201)
    //         .end((res) => {
    //             // expect(spy.mock.calls.length).toBe(1);
    //             // console.log(res);
    //             expect(res.body).toEqual(product);
    //         });
    //     done();
    // });

    // afterAll(async () => {
    //     await connection.disconnect();
    // });

})


//reference -> https://trashpanda.cc/2019/12/nailing-up-a-typescript-and-jest-project/
