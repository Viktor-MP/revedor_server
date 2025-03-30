require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5001;
const bodyParser = require("body-parser");
const router = require("./src/routes/router");
const errorMiddleware = require("./src/middlewares/error-middleware");

// access for every user

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
const cors = require("cors");
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);

// Use body-parser middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", router);
app.use(errorMiddleware);

// Front app run requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


// wbApi + token
// https://suppliers-api.wildberries.ru/content/v1/cards/filter


// no token
// https://basket-20.wbbasket.ru/vol3426/part342605/342605943/info/ru/card.json
// https://catalog.wb.ru/brands/v2/catalog?ab_testing=false&appType=1&brand=312129929&curr=amd&dest=36&hide_dtype=10&lang=ru&page=1&sort=popular&spp=30


// async function getProductImages(article, token) {
//     const url =
//         "https://basket-20.wbbasket.ru/vol3426/part342605/342605943/info/ru/card.json";

//     const requestBody = {
//         settings: {
//             cursor: { limit: 1 },
//             filter: { nmID: [article] },
//         },
//     };

//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 // Authorization: token,
//             },
           
//         });

//         const data = await response.json();
//         console.log(data)

//         if (data.cards && data.cards.length > 0) {
//             const product = data.cards[0];
//             const images = product.mediaFiles; // Список URL изображений
//             console.log(images);
//             return images;
//         } else {
//             console.log("Товар не найден.");
//             return [];
//         }
//     } catch (error) {
//         console.error("Ошибка при получении данных:", error);
//     }
// }

const startApp = async () => {
    try {
        let brandName = "EastWest Kitchen";
        app.listen(PORT, () => {
            console.log(`Server is running on port - ${PORT}`);
        });
        // fetch(
        //     `https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter?limit=10&offset=10`,
        //     {
        //         method: "GET",
        //         headers: {
        //             Authorization:
        //                 "", // Replace "HeaderApiKey" with your actual API key
        //         },
        //     }
        // )
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then((data) => console.log(JSON.stringify(data, null, 2)))
        //     .catch((error) => console.error("Error:", error));
    } catch (error) {
        console.log(error);
    }
};

startApp();
