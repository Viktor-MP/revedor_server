const logger = require("../logger/logger")
const axios = require("axios")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")
const nodemailer = require("nodemailer")

const OwnerEmailTemplate = require("../gmailTemplates/OwnerEmailTemplate")
const UserConfirmationEmail = require("../gmailTemplates/UserConfirmationEmail")

require("dotenv").config()

const WB_TOKEN = process.env.TEST_TOKEN_WB

class MailService {
    constructor() {
        if (!MailService.instance) {
            this.transporter = nodemailer.createTransport({
                service: "gmail", // Change if using another provider
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD, // App password, not real password
                },
            })

            MailService.instance = this
        }

        return MailService.instance
    }

    sendGmail = async (to, subject, html) => {
        console.log("Sending email to:", to)
        try {
            const mailOptions = {
                from: process.env.EMAIL,
                to,
                subject,
                html,
            }

            const info = await this.transporter.sendMail(mailOptions)
            console.log("Email sent:", info.response)

            return { success: true, message: "Email sent successfully!" }
        } catch (error) {
            console.error("Error sending email:", error)
            return { success: false, message: "Failed to send email" }
        }
    }

    sendConfirmation = async (email, name) => {
        const emailHtml = UserConfirmationEmail({ name })

        return await this.sendGmail(
            email,
            "We've Received Your Message!",
            emailHtml
        )
    }

    sendToOwner = async (req, res) => {
        const { name, userEmail, subject, message } = req.body
        console.log("to", process.env.OWNER_EMAIL)
        console.log("Email received fromm:", name, userEmail, subject, message)
        if (!name || !userEmail || !subject || !message) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" })
        }
        if (!userEmail.includes("@")) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email address" })
        }

        const html = OwnerEmailTemplate({ name, userEmail, subject, message })
        try {
            const ownerResponse = await this.sendGmail(
                process.env.OWNER_EMAIL,
                "New Contact Form Submission",
                html
            )
            console.log("Owner Email", process.env.OWNER_EMAIL)
            if (!ownerResponse.success) {
                return res.status(500).json(ownerResponse)
            }

            console.log("Email sent to owner successfully!")

            // Send confirmation email to user
            const userResponse = await this.sendConfirmation(userEmail, name)

            return res
                .status(userResponse.success ? 200 : 500)
                .json(userResponse)
        } catch (error) {
            console.error("Error sending email:", error)
            return res
                .status(500)
                .json({ success: false, message: "Failed to send email" })
        }
    }
}
    
module.exports = new MailService()
