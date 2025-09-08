import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// --- PLANTILLA DE CONFIRMACIÓN PARA EL USUARIO ---
const createConfirmationEmailHtml = (name: string) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Mömenta Invitaciones</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Sora', Arial, sans-serif; color:#374151;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f3f4f6">
      <tr>
        <td align="center" style="padding:20px 0;">
          <!-- Container -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
            
            <!-- Logo -->
            <tr>
              <td align="center" bgcolor="#FBFBFB" style="padding:20px;">
                <img src="https://i.imgur.com/Y63Cy9i.gif" alt="Mömenta Invitaciones" width="250" border="0" style="display:block;">
              </td>
            </tr>

            <!-- Header -->
            <tr>
              <td align="center" bgcolor="#4f39f6" style="padding:20px; color:#ffffff;">
                <h1 style="margin:0; font-size:24px; font-weight:bold; font-family:Arial, sans-serif;">¡Tu solicitud está en camino!</h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td align="left" style="padding:32px; font-size:16px; line-height:1.6; font-family:Arial, sans-serif; color:#374151;">
                <p style="margin:0 0 20px 0; font-size: 22px;">Hola <strong>${name}</strong>,</p>
                <p style="margin:0 0 20px 0;">Gracias por acercarte a <strong>Mömenta</strong>. Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo en un plazo máximo de <strong>24 horas hábiles</strong>.</p>
                <p style="margin:0 0 20px 0;">Queremos acompañarte en cada detalle de tu evento para que sea tan único como lo imaginas ✨.</p>
                <p style="margin:0 0 20px 0;">Mientras tanto, te invitamos a descubrir más de nuestro trabajo en <a href="https://www.momentainvitaciones.com.mx" style="color:#4f39f6;">momentainvitaciones.com.mx</a>.</p>
                <p style="margin:0 0 20px 0;">Con cariño,<br>El equipo de <strong>Mömenta</strong></p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:20px; font-size:12px; color:#9ca3af; font-family:Arial, sans-serif;">
                © ${new Date().getFullYear()} Mömenta Invitaciones. Todos los derechos reservados.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// --- PLANTILLA DE NOTIFICACIÓN PARA TI ---
const createNotificationEmailHtml = (data: Record<string, any>) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Sora', sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; color: #374151; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
    .header { background-color: #1f2937; color: white; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 32px; }
    .data-item { margin-bottom: 16px; }
    .data-item strong { display: block; color: #4b5563; font-size: 14px; margin-bottom: 4px; }
    .data-item p { margin: 0; font-size: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nueva Solicitud de Invitación</h1>
    </div>
    <div class="content">
      <div class="data-item">
        <strong>Nombre:</strong>
        <p>${data.name}</p>
      </div>
      <div class="data-item">
        <strong>Email:</strong>
        <p>${data.email}</p>
      </div>
      <div class="data-item">
        <strong>Teléfono:</strong>
        <p>${data.phone || "No proporcionado"}</p>
      </div>
      <div class="data-item">
        <strong>Tipo de Evento:</strong>
        <p>${data.eventType}</p>
      </div>
      <div class="data-item">
        <strong>Mensaje:</strong>
        <p>${data.message || "No proporcionado"}</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const prerender = false;

async function appendToSheet(data: Record<string, any>) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(import.meta.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = import.meta.env.GOOGLE_SHEET_ID;

  // Concatenamos los datos de contacto
  const contactData = [data.email, data.phone].filter(Boolean).join(" / ");

  // Preparamos la fila con el orden exacto de tus columnas
  const row = [
    new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }), // Fecha de contacto
    data.name, // Nombre Completo
    data.eventType, // Evento
    "", // Empresa (vacio)
    "", // Ciudad (vacio)
    "Landing", // Canal
    "Nuevo", // Estado
    "", // Interes (vacio)
    "", // Presupuesto Estimando MXN (vacio)
    contactData, // Datos de contacto
    data.message || "", // Notas
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email } = data;

  // --- CONFIGURACIÓN DE NODEMAILER PARA HOSTINGER ---
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  });

  try {
    //  --- ESCRIBIR EN GOOGLE SHEETS ---
    await appendToSheet(data);

    // --- ENVIAR CORREO DE CONFIRMACIÓN AL USUARIO ---
    await transporter.sendMail({
      from: `"Mömenta Invitaciones" <${import.meta.env.SMTP_USER}>`,
      to: email,
      subject: "Estas más cerca de tu momento ✨",
      html: createConfirmationEmailHtml(name),
    });

    // --- ENVIAR CORREO DE NOTIFICACIÓN PARA TI ---
    await transporter.sendMail({
      from: `"Mömenta" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.ADMIN_EMAIL,
      subject: "Mömenta te esta hablando 👀 🗣️",
      html: createNotificationEmailHtml(data),
    });

    return new Response(
      JSON.stringify({
        message:
          "¡Gracias por escribirnos! Hemos recibido tu mensaje y te responderemos en breve.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Error al enviar tus datos. Inténtalo de nuevo.",
      }),
      { status: 500 }
    );
  }
};
