import emailjs from '@emailjs/browser';

interface EmailParams {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
}

class EmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('EmailJS Configuration Debug:', {
      serviceId: this.serviceId,
      templateId: this.templateId,
      publicKey: this.publicKey ? 'Present' : 'Missing',
      allEnvVars: import.meta.env
    });

    if (!this.serviceId || !this.templateId || !this.publicKey) {
      console.error('EmailJS configuration is missing. Please check your environment variables.');
      console.error('Make sure you have a .env file in the root directory with:');
      console.error('VITE_EMAILJS_SERVICE_ID=your_service_id');
      console.error('VITE_EMAILJS_TEMPLATE_ID=your_template_id');
      console.error('VITE_EMAILJS_PUBLIC_KEY=your_public_key');
    }
  }

  async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      if (!this.serviceId || !this.templateId || !this.publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      const templateParams = {
        from_name: params.from_name,
        from_email: params.from_email,
        message: params.message,
        service_type: params.service_type || 'No especificado',
        to_name: params.to_name || 'Portfolio Contact',
      };

      console.log('EmailJS - Sending with params:', templateParams);

      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams,
        this.publicKey
      );

      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  // Initialize EmailJS
  init(): void {
    if (this.publicKey) {
      emailjs.init(this.publicKey);
    }
  }
}

export const emailService = new EmailService();
