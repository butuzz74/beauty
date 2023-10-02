var SibApiV3Sdk = require('sib-api-v3-sdk');
const config = require("config");
const { response } = require('express');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.get("api_key");

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
 // SendSmtpEmail | Values to send a transactional email

sendSmtpEmail = {
	to: [{
		email: 'butuzz74@gmail.com',
		name: 'John Doe'
	}],	
	// templateId: 2,
	subject: "Test",
	htmlContent: `<h1>Test</h1>`,
	textContent: `New test letter`,
	params: {
		name: 'John',
		surname: 'Doe'
	},
	headers: {
		'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
	},
		
};
async function start(){
	try {
		const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
		console.log(data)
	} catch (error) {
		console.error(error);		
	}
}
start()

