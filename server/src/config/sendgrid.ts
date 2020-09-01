import prefix from "./environment";

export const sendgridSettings: {
  apiKey: string | undefined;
  fromEmail: string | undefined;
  mails: {
    welcome: {
      subject: string;
    };
  };
} = {
  apiKey: process.env[`SENDGRID_API_KEY`],
  fromEmail: process.env[`SENDGRID_FROM_EMAIL`],
  mails: {
    welcome: {
      subject: "Bienvenido player",
    },
  },
};
