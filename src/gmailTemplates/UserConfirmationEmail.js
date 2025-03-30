const UserConfirmationEmail = ({ name }) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #007BFF; text-align: center;">Thank You for Contacting Us!</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>We have received your message and our team will get back to you as soon as possible.</p>
            <p>If you have any urgent concerns, feel free to reach out directly.</p>
            <br />
            <p>Best Regards,</p>
            <p><strong>Reve D'or</strong></p>
            <hr />
            <p style="text-align: center; font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p>
        </div>
    `
}

module.exports = UserConfirmationEmail
