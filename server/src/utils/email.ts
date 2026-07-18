import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    let transporter;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use Real Email (Production/Gmail)
      transporter = nodemailer.createTransport({
        service: "gmail", // Using Gmail as the default free real provider
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      if (process.env.NODE_ENV === "production") {
        console.log("Skipping email verification because SMTP_USER is not set in production.");
        return;
      }
      // Fallback to Ethereal Email (Local Development)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const verificationUrl = `${clientUrl}/verify-email?token=${token}`;

    const info = await transporter.sendMail({
      from: '"TravelGPT" <noreply@travelgpt.com>',
      to: email,
      subject: "Verify Your Email Address",
      text: `Welcome to TravelGPT! Please verify your email by clicking: ${verificationUrl}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Welcome to TravelGPT! 🌍</h2>
              <p>You're one step away from AI-powered travel planning.</p>
              <p>Please verify your email address by clicking the button below:</p>
              <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">If the button doesn't work, copy this link: ${verificationUrl}</p>
             </div>`,
    });

    console.log("\n========================================================");
    console.log("✉️  EMAIL SENT SUCCESSFULLY!");
    console.log("🔗 Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("========================================================\n");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
