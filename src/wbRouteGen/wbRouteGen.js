// all brand products
// https://catalog.wb.ru/brands/v2/catalog?ab_testing=false&appType=1&brand=312129929&curr=amd&dest=36&hide_dtype=10&lang=ru&page=1&sort=popular&spp=30

// deep info
// https://basket-20.wbbasket.ru/vol3378/part337854/337854294/info/ru/card.json

// images
// https://basket-20.wbbasket.ru/vol3378/part337875/337875037/images/big/1.webp
// https://basket-20.wbbasket.ru/vol3378/part337875/337875037/images/c246x328/1.webp
// https://basket-20.wbbasket.ru/vol3378/part337875/337875037/images/c516x688/1.webp

// Logo
// https://static-basket-01.wbbasket.ru/vol0/brand-flow-logos/by-id/312129929.webp

// web page url
// https://www.wildberries.ru/catalog/337875037/detail.aspx

const { LocalStorage } = require("node-localstorage")

// Create a local storage directory
const localStorage = new LocalStorage("./scratch")

class URl_Generator {
    async setId(id) {
        this.id = id
        this.part = ~~(id / 1e3)
        this.vol = ~~(id / 1e5)
        this.basket = ((s) => {
            let r
            switch (!0) {
                case s >= 0 && s <= 143:
                    r = "01"
                    break
                case s <= 287:
                    r = "02"
                    break
                case s <= 431:
                    r = "03"
                    break
                case s <= 719:
                    r = "04"
                    break
                case s <= 1007:
                    r = "05"
                    break
                case s <= 1061:
                    r = "06"
                    break
                case s <= 1115:
                    r = "07"
                    break
                case s <= 1169:
                    r = "08"
                    break
                case s <= 1313:
                    r = "09"
                    break
                case s <= 1601:
                    r = "10"
                    break
                case s <= 1655:
                    r = "11"
                    break
                case s <= 1919:
                    r = "12"
                    break
                case s <= 2045:
                    r = "13"
                    break
                case s <= 2189:
                    r = "14"
                    break
                case s <= 2405:
                    r = "15"
                    break
                case s <= 2621:
                    r = "16"
                    break
                case s <= 2837:
                    r = "17"
                    break
                case s <= 3053:
                    r = "18"
                    break
                case s <= 3269:
                    r = "19"
                    break
                case s <= 3485:
                    r = "20"
                    break
                case s <= 3701:
                    r = "21"
                    break
                case s <= 3917:
                    r = "22"
                    break
                default:
                    r = "23"
            }
            return r
        })(this.vol)
    }

    async webPageUrl() {
        return `https://www.wildberries.ru/catalog/${this.id}/detail.aspx`
    }

    async volInfoPhotoHost() {
        return `https://basket-${this.basket}.wbbasket.ru/vol${this.vol}/part${this.part}/${this.id}`
    }

    async photoHost(num = 1) {
        return (await this.volInfoPhotoHost()) + `/images/big/${num}.webp`
    }

    async cardInfo() {
        return (await this.volInfoPhotoHost()) + `/info/ru/card.json`
    }

    async setMedia(pics) {
        // console.log("pics",pics)
        const media = []
        for (let i = 0; i < pics; i++) {
            media[i] = await this.photoHost(i + 1)
        }
        // console.log(media)
        return media
    }

    async modifyData(products) {
        for (const da of products) {
            this.setId(da.id)
            da.link = await this.webPageUrl()
           
            da.media = await this.setMedia(da.pics)
            localStorage.setItem(da.id, JSON.stringify(da.media))
        }
    }

    async getMedia(id) {
        return JSON.parse(localStorage.getItem(id))
    }
}

module.exports = new URl_Generator()
