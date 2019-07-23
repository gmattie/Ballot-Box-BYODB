const app = require("express")();
const mongoose = require("mongoose");
const config = require("config");


const connectDB = async () => {

    const dbConfig = config.get("dbConfig");
    const mongoURI = `${dbConfig.protocol}://${dbConfig.user}:${dbConfig.pass}@${dbConfig.path}`;

    try {

        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Database connected...");
    }
    catch(err) {

        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

app.get("/", (req, res) => {
    
    return res
            .status(200)
            .send("API Running");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));