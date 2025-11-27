import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Discord Webhook URL (Store in .env in production)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, email, phone, service, budget, description, fileUrl } = data;

        // 1. Send to Discord via Webhook
        if (DISCORD_WEBHOOK_URL) {
            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: `New Lead: ${name}`,
                        color: 0x00ff00, // Green
                        fields: [
                            { name: 'Email', value: email, inline: true },
                            { name: 'Phone', value: phone, inline: true },
                            { name: 'Service', value: service, inline: true },
                            { name: 'Budget', value: budget, inline: true },
                            { name: 'Description', value: description || 'N/A' },
                            { name: 'File', value: fileUrl || 'No file attached' }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            });
        }

        // 2. Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 3. Admin Notification Email Template
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `🚀 New Project Lead: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">New Project Inquiry</h2>
                    </div>
                    <div style="padding: 20px; background-color: #f9f9f9;">
                        <p style="font-size: 16px; color: #333;">You have received a new lead from your portfolio website.</p>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Service</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${service}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Budget</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${budget}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 5px;">Project Description:</p>
                            <p style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">${description}</p>
                        </div>
                        ${fileUrl ? `<p style="margin-top: 20px;"><strong>Attachment:</strong> <a href="${fileUrl}" style="color: #0070f3;">View File</a></p>` : ''}
                    </div>
                    <div style="background-color: #eee; padding: 10px; text-align: center; font-size: 12px; color: #666;">
                        Sent from your Portfolio Website
                    </div>
                </div>
            `,
        };

        // 4. Client Confirmation Email Template
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Message Received - Let's Build Something Great!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #000; color: #fff; padding: 30px 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">Message Received</h1>
                    </div>
                    <div style="padding: 30px; background-color: #fff;">
                        <p style="font-size: 16px; color: #333; line-height: 1.5;">Hi <strong>${name}</strong>,</p>
                        <p style="font-size: 16px; color: #333; line-height: 1.5;">Thank you for reaching out! I have received your inquiry regarding <strong>${service}</strong>.</p>
                        <p style="font-size: 16px; color: #333; line-height: 1.5;">I review all requests personally and will get back to you within 24 hours to discuss how we can bring your vision to life.</p>
                        
                        <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-left: 4px solid #000; border-radius: 4px;">
                            <p style="margin: 0; font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Request Summary</p>
                            <p style="margin: 10px 0 0 0; font-size: 14px; color: #333;"><strong>Service:</strong> ${service}</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #333;"><strong>Budget:</strong> ${budget}</p>
                        </div>

                        <p style="font-size: 16px; color: #333; line-height: 1.5;">In the meantime, feel free to browse my <a href="https://yourportfolio.com/portfolio" style="color: #000; text-decoration: underline;">portfolio</a> or connect with me on <a href="https://linkedin.com" style="color: #000; text-decoration: underline;">LinkedIn</a>.</p>
                        
                        <p style="margin-top: 30px; font-size: 16px; color: #333;">Best regards,<br><strong>Khateeb</strong></p>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                        &copy; ${new Date().getFullYear()} Khateeb. All rights reserved.
                    </div>
                </div>
            `,
        };

        // Send emails if config exists
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await Promise.all([
                transporter.sendMail(adminMailOptions),
                transporter.sendMail(clientMailOptions)
            ]);
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
    }
}
