import mongo from './configurations/database/mongoDb';
import createApp from "./server/createApp";

async function startApp() {
    try{
        // await mongo.connect();
        const app = await createApp();
        const port = process.env.PORT || 8081;
        app.listen( port, () => {
            console.log("Server is listening at http://localhost:8080");
        });
    } catch(e) {
    //    return response 500 internal error
    }
}

startApp();
