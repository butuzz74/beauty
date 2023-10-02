const brevo = require("@getbrevo/brevo");
const config = require("config");

module.exports = async function sendEmail(name, phone, massage, time ) {
  const defaultClient = brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = config.get("api_key");

  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent =
    `<html><body><h1>Common: Привет! Поступил новый заказ от ${name} тел.${phone}. Она(он) хотела бы получить ${massage}. Желаемое время ${time}.</h1></body></html>`;
  sendSmtpEmail.sender = { name: "John", email: "example@example.com" };
  sendSmtpEmail.to = [{ email: "butuzz74@gmail.com", name: "Марина" }];
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "common subject",
  };
  return await apiInstance.sendTransacEmail(sendSmtpEmail)
};