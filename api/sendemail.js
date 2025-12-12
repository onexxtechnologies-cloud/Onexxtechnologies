import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, phone, city, product, bussinessname, message } = req.body;

  try {
    await resend.emails.send({
      from: "Enquiry <onboarding@resend.dev>",
      to: "onexxtechnologies@gmail.com", // <-- YOUR PERSONAL EMAIL HERE
      subject: "New Enquiry Received",
      text: `
        New customer enquiry:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        City: ${city}
        Bussiness Type: ${bussinessname}
        Product Interested: ${product}
        Message: ${message}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}
