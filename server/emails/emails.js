const brevo = require("@getbrevo/brevo");
const config = require("config");

module.exports = async function sendEmail(email, name) {
  const defaultClient = brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = config.get("api_key");

  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent =
    `<html><body><h1>Common: Привет ${name}! Спасибо за регистрацию! Надеемся на долговременное сотрудничество!</h1></body></html>`;
  sendSmtpEmail.sender = { name: "John", email: "example@example.com" };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "common subject",
  };
  return await apiInstance.sendTransacEmail(sendSmtpEmail)
};
