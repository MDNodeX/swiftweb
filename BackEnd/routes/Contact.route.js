import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ADMIN EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_HOST,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Inquiry - ${subject}`,
      html: `
  <div style="font-family:Arial;padding:20px">
    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Subject:</strong> ${subject}</p>

    <div style="
      margin-top:20px;
      padding:15px;
      background:#f5f5f5;
      border-radius:8px;
    ">
      ${message}
    </div>
  </div>
`,
    });

    // USER AUTO REPLY
    await transporter.sendMail({
      //   from: process.env.EMAIL_HOST,
      from: `"SwiftWeb Team" <${process.env.EMAIL_HOST}>`,
      to: email,
      replyTo: email,
      subject: "We Received Your Message",
      html: `
        <h2>Hello ${name},</h2>

        <p>
          Thank you for contacting us.
          We received your message and will get back to you shortly.
        </p>

        <p>Best Regards</p>
      `,
    });

    res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
