const axios = require("axios")

const URl_Generator = require("../wbRouteGen/wbRouteGen")

class WbRoute_controller {
    async sellerProducts(req, res, next) {
        console.log("Received Query Params:", req.query)
        const { page, curr, lang } = req.query

        try {
            const response = await axios.get(
                "https://catalog.wb.ru/sellers/v2/catalog",
                {
                    params: {
                        ab_testing: "false",
                        appType: "1",
                        curr: "amd",
                        dest: "36",
                        hide_dtype: "10",
                        lang: "ru",
                        page: page,
                        sort: "pricedown",
                        spp: "30",
                        supplier: "4213665",
                    },
                }
            )

            await URl_Generator.modifyData(response.data.data.products)
            console.log(response)
            res.json(response.data) // Send the Wildberries data as API response
        } catch (error) {
            console.error("Error fetching data:", error.message)
            res.status(500).json({
                error: "Failed to fetch data from Wildberries",
            })
        }
    }

    async cardInfo(req, res, next) {
        console.log("Received Query Params:", req.query)
        const id = req.query.id
        try {
            URl_Generator.setId(id)
            const url = await URl_Generator.cardInfo()
            console.log(url)

            const response = await axios.get(url)
            try {
                response.data.media.photos = await URl_Generator.getMedia(id)
                URl_Generator.setId(id)
                response.data.link = await URl_Generator.webPageUrl()
            } catch (error) {
                await URl_Generator.setId(id)
                response.data.media.photos = await URl_Generator.setMedia(
                    response.data.media.photo_count
                )
                console.error("Error fetching media data:", error.message)
            }
            console.log(response.data)
            res.json(response.data) // Send the data to the frontend
        } catch (error) {
            console.error("Error fetching data:", error.message)
            res.status(500).json({
                error: "Failed to fetch data from Wildberries",
            })
        }
    }
}

module.exports = new WbRoute_controller()
