import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Validación de entrada más robusta
function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remover caracteres peligrosos
}

// Validación de email según RFC 5322 simplificado
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
  const parts = email.split('@');
  return emailRegex.test(email) && parts.length === 2 && domainRegex.test(parts[1]);
}

// Validación de teléfono
function isValidPhone(phone: string): boolean {
  return /^[\d\s\-\+\(\)]{7,20}$/.test(phone);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Sanitizar entradas
    const sanitizedName = sanitizeInput(name as string, 100);
    const sanitizedEmail = (email as string)?.toLowerCase().trim() || '';
    const sanitizedPhone = phone ? sanitizeInput(phone as string, 20) : '';
    const sanitizedMessage = sanitizeInput(message as string, 5000);

    // Validaciones
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return NextResponse.json(
        { error: 'Por favor completa todos los campos obligatorios' },
        { status: 400 }
      );
    }

    if (sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'El nombre debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Por favor ingresa un email válido' },
        { status: 400 }
      );
    }

    if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: 'Por favor ingresa un teléfono válido' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 10 caracteres' },
        { status: 400 }
      );
    }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Variables de entorno SMTP no configuradas');
      return NextResponse.json(
        { error: 'El servicio de email no está configurado. Por favor contacta directamente a info@lumicawebdesign.com' },
        { status: 503 }
      );
    }

    // Configurar el transportador de nodemailer con validación segura
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // Usar TLS automáticamente si es 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: true // Validar certificados en producción
      },
      connectionTimeout: 5000,
      socketTimeout: 5000
    });

    // Contenido del email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Nueva consulta de ${sanitizedName} - Lumica Web Design`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #fca32d 0%, #0344d4 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0344d4; display: block; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #fca32d; word-wrap: break-word; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📧 Nueva Consulta Web</h2>
              <p style="margin: 5px 0 0 0;">Lumica Web Design</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Nombre:</span>
                <div class="value">${sanitizedName}</div>
              </div>
              <div class="field">
                <span class="label">✉️ Email:</span>
                <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
              </div>
              ${sanitizedPhone ? `
              <div class="field">
                <span class="label">📱 Teléfono:</span>
                <div class="value"><a href="tel:${sanitizedPhone}">${sanitizedPhone}</a></div>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">💬 Mensaje:</span>
                <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de web.lumicawebdesign.com</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nueva consulta de: ${sanitizedName}
Email: ${sanitizedEmail}
${sanitizedPhone ? `Teléfono: ${sanitizedPhone}` : ''}

Mensaje:
${sanitizedMessage}
      `,
    };

    // Verificar conexión antes de enviar
    await transporter.verify();

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: '¡Mensaje enviado correctamente! Te responderemos pronto.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar email:', error);

    // Error más específico
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    if (errorMessage.includes('auth') || errorMessage.includes('Invalid login')) {
      return NextResponse.json(
        { error: 'Error de autenticación del servidor de email. Por favor contacta a info@lumicawebdesign.com' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contacta directamente a info@lumicawebdesign.com' },
      { status: 500 }
    );
  }
}
