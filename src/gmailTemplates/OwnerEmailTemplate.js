const OwnerEmailTemplate = ({ name, userEmail, subject, message }) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #333; text-align: center;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Subject:</strong> ${subject}</p>

            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #fff; padding: 10px; border-left: 4px solid #007BFF;">${message}</p>
            <hr />
            <p style="text-align: center; font-size: 12px; color: #777;">This email was sent from your website contact form.</p>
        </div>
    `
}

module.exports = OwnerEmailTemplate
