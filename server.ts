import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 PDF
  app.use(express.json({ limit: '10mb' }));

  app.post('/api/send-kyc', async (req, res) => {
    try {
      const { pdfBase64, fullName, emailTo } = req.body;

      if (!pdfBase64) {
        return res.status(400).json({ error: 'PDF data missing' });
      }

      // Configure your SMTP credentials here.
      // If not configured, we just simulate sending.
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
            user: process.env.SMTP_USER || 'test',
            pass: process.env.SMTP_PASS || 'test'
        }
      });

      // We remove the data:application/pdf;base64, prefix if it exists
      const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");

      const mailOptions = {
        from: '"AMX Portal" <noreply@amx.ae>',
        to: emailTo || 'marat@amx.ae',
        subject: `New KYC Submission - ${fullName || 'Client'}`,
        text: `A new KYC form has been submitted by ${fullName || 'a client'}. Please find the PDF attached.`,
        attachments: [
          {
            filename: `KYC_${fullName ? fullName.replace(/\s+/g, '_') : 'Client'}.pdf`,
            content: base64Data,
            encoding: 'base64'
          }
        ]
      };

      try {
        if (!process.env.SMTP_USER) {
          console.log(`[Email Simulation] Sending KYC PDF from ${fullName} to ${mailOptions.to}`);
          console.log(`[Email Simulation] Attachment size: ${base64Data.length} chars (base64)`);
          console.log(`[Email Notice] Please configure SMTP_USER, SMTP_PASS, SMTP_HOST to send real emails.`);
        } else {
          const info = await transporter.sendMail(mailOptions);
          console.log('Message sent: %s', info.messageId);
        }
        res.json({ success: true, message: 'KYC PDF generated and dispatched securely.' });
      } catch (emailError: any) {
        console.error("Error sending email:", emailError);
        res.status(500).json({ error: 'Mail delivery failed: ' + emailError.message });
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/send-mortgage-contact', async (req, res) => {
    try {
      const { name, email, phone, message, propertyPrice, downPaymentAmount, monthlyPayment, loanTerm, interestRate, emailTo } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
            user: process.env.SMTP_USER || 'test',
            pass: process.env.SMTP_PASS || 'test'
        }
      });

      const emailText = `
New Mortgage Contact Request:

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}

Message:
${message || 'No additional message.'}

--- Mortgage Details ---
Property Value: AED ${propertyPrice}
Down Payment: AED ${downPaymentAmount}
Monthly Payment: AED ${monthlyPayment}
Loan Term: ${loanTerm} Years
Interest Rate: ${interestRate}%
`;

      const mailOptions = {
        from: '"AMX Portal" <noreply@amx.ae>',
        to: emailTo || 'marat@amx.ae',
        subject: `New Mortgage Inquiry - ${name}`,
        text: emailText,
      };

      try {
        if (!process.env.SMTP_USER) {
          console.log(`[Email Simulation] Sending Mortgage Inquiry from ${name} to ${mailOptions.to}`);
          console.log(emailText);
        } else {
          const info = await transporter.sendMail(mailOptions);
          console.log('Message sent: %s', info.messageId);
        }
        res.json({ success: true, message: 'Message sent successfully.' });
      } catch (emailError: any) {
        console.error("Error sending email:", emailError);
        res.status(500).json({ error: 'Mail delivery failed: ' + emailError.message });
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
