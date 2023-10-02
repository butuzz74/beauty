const brevo = require('@getbrevo/brevo');
let defaultClient = brevo.ApiClient.instance;
const config = require("config")

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.get("api_key");

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();


sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
sendSmtpEmail.to = [
  { "email": "butuzz74@gmail.com", "name": "sample-name" }
];
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });