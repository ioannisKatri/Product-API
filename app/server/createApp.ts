import express from 'express';
import bodyParser from 'body-parser';
import listCalculatorService from "../services/calculator/listCalculatorService";
import {apiErrCodes, dbErrorCodes, productErrors} from "../logging-codes/loggingCodes";
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import ProductModel from "./model/product";
import {itemMapFunction} from "../services/calculator/item";

const swaggerDocument1 = require('./swaggerFile/swagger.json');
// TODO -> FOR BUILD  check JSON LOADER


export default async function createApp() {
    const app = express();
    app.use(bodyParser.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument1));

    app.get("/", (req: express.Request, res: express.Response) => {
        res.status(200);
        res.sendFile(path.join(process.cwd(), "/assets/", "index.html"));
        // res.json({
        //     hello: " IT works !!" + "" + process.env['HELLO_WORLD']
        // });
        // res.send(process.env);
    });

    app.post("/product", (req: express.Request, res: express.Response) => {
        if (!req.body && !req.body.name && !req.body.price) {
            res.status(400).send({status: "Error", message: productErrors.NAVE_KEY_MISSING});
        }

        let product = new ProductModel(req.body);
        product.save((err, doc) => {
            if (err) {
                if (err.message.includes('E11000')) {
                    return res
                        .status(400)
                        .send({status: "Error", message: dbErrorCodes.DUPLICATE_CONTENT});
                } else {
                    // TODO -> Ask If I should log here
                    return res
                        .status(400)
                        .send({status: "Error", message: apiErrCodes.BAD_REQUEST});
                }
            } else {
                return res.status(201).send({status: "Success", message: doc});
            }
        });
    });

    app.get("/product/:id", (req, res) => {
        if (!req.body && !req.body.id) {
            return res.status(400).send({status: 'Error', message: ''})
        }

        ProductModel.findById(req.params.id, (err, doc) => {
            //TODO -> discuss what I should return for this as error -> Cast to ObjectId failed for value "5f9428af2a103e6f2e0222bb9" at path "id" for model "Product"
            if (err) {
                return res
                    .status(400)
                    .send({status: "Error", message: productErrors.PRODUCT_NOT_FOUND});
            } else {
                return res.status(201).send({status: "Success", message: doc});
            }
        })
    });

    app.post("/list-price", (req, res) => {
        const shoppingList = req.body;

        if (Object.keys(shoppingList).length === 0) {
            return res.status(400).send({status: "error", message: apiErrCodes.BAD_REQUEST});
        }

        try {
            const calculator: number = listCalculatorService.listPriceCalculator(itemMapFunction(shoppingList));
            return res.status(200)
                .json({
                    status: "success",
                    total_price: calculator,
                });
        } catch (e) {
            // Propagate Error messages
            // Network Error Class / Function
            const getNetworkErrorMessage = () => {
                console.log(e.message);
            };
            // From normal error to a network error --> obscure
            return res.status(500).json({
                status: "error",
                message: e.message, // DO NOT EXPOSE THIS
            });
        }
    });
    return app;
}