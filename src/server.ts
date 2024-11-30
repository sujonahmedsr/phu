import mongoose from "mongoose"
import app from "./app"
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000
const databAseUrl = process.env.DBURL

async function main() {
    try {
        await mongoose.connect(databAseUrl as string);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main()

