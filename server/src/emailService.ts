import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  service: string;
  message: string;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // Puedes cambiar a otro proveedor
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Usar App Password para Gmail
    }
  });
};

export const sendEmail = async (data: EmailData) => {
  try {
    const transporter = createTransporter();

    // Email para el destinatario (tú)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4854ff, #6a80ff); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">📧 Nuevo mensaje de contacto</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Portafolio Virtual - Fabritcio Peña</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #4854ff; padding-bottom: 10px;">
                📋 Información del contacto
              </h3>
              
              <div style="margin-bottom: 20px;">
                <p style="margin: 8px 0; color: #555;">
                  <strong>👤 Nombre:</strong> ${data.name}
                </p>
                <p style="margin: 8px 0; color: #555;">
                  <strong>📧 Email:</strong> <a href="mailto:${data.email}" style="color: #4854ff;">${data.email}</a>
                </p>
                <p style="margin: 8px 0; color: #555;">
                  <strong>🛠️ Servicio:</strong> ${data.service}
                </p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #4854ff;">
                <h4 style="margin-top: 0; color: #333;">💬 Mensaje:</h4>
                <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  📅 Enviado el ${new Date().toLocaleString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    };

    // Email de confirmación para el remitente
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Gracias por contactarme - Fabritcio Peña',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4854ff, #6a80ff); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">¡Hola ${data.name}! 👋</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Gracias por contactarme</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 0;">
                He recibido tu mensaje sobre <strong>${data.service}</strong> y me pondré en contacto contigo en las próximas 24 horas.
              </p>
              
              <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2196f3;">
                <p style="margin: 0; color: #1976d2; font-weight: 500;">
                  📧 <strong>Respuesta rápida:</strong> Te responderé a ${data.email}
                </p>
              </div>
              
              <p style="color: #555; font-size: 14px; line-height: 1.6;">
                Mientras tanto, puedes revisar mis proyectos en mi portafolio o seguirme en mis redes sociales.
              </p>
              
              <div style="text-align: center; margin-top: 25px;">
                <p style="margin: 0; color: #666; font-size: 12px;">
                  Este es un mensaje automático. Por favor, no respondas a este email.
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    };

    // Enviar ambos emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationOptions);

    return { success: true };

  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
