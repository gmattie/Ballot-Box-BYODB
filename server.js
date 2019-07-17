const app = require("express")();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    
    return res
            .status(200)
            .send("API Running");
});

app.listen(port, () => console.log(`Server running on port ${port}`));