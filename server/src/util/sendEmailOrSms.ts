/* to sms */
import axios from "axios";
import qs from "querystring";
/* settings */
import sendgridMail from "@sendgrid/mail";
import { hablameSettings } from "../config/hablame";
import { sendgridSettings } from "../config/sendgrid";

/* Hablame Settings */
let HABLAME_URI = hablameSettings.apiUri || "";
let HABLAME_KEY = hablameSettings.apiKey || "";
let HABLAME_CLIENT = hablameSettings.apiClient || "";

/* Sengrid Settings */
let SENDGRID_API_KEY = sendgridSettings.apiKey || "";
let SENDGRID_FROM_EMAIL = sendgridSettings.fromEmail || "";

sendgridMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async ({
  email,
  subject,
  content,
}: {
  email: any;
  subject?: string | undefined;
  content: any;
}): Promise<any> => {
  const mailDetail = {
    to: email,
    from: SENDGRID_FROM_EMAIL,
    subject,
    html: content,
  };
  try {
    let result_send = await sendgridMail.send(mailDetail);
    console.log(" result_send: ", result_send);
    return result_send;
  } catch (e) {
    console.log("Error sending an email");
    console.log(e);
  }
};

export const sendSms = async ({
  phone,
  message,
  reference,
}: {
  phone: any;
  message?: string | undefined;
  reference: any;
}): Promise<any> => {
  const smsDetail = {
    cliente: HABLAME_CLIENT,
    api: HABLAME_KEY,
    numero: `57${phone}`,
    sms: `${message}`,
    fecha: "",
    referencia: reference || "",
  };

  try {
    const { data } = await axios.post(HABLAME_URI, qs.stringify(smsDetail), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("SMS RESULT: ", data);
    return data;
  } catch (e) {
    console.log(e.message);
    console.log("Error sending an sms");
  }
};
