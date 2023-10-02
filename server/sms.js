const SibApiV3Sdk = require('sib-api-v3-sdk');
const config = require("config");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = config.get("api_key");

let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

let sendTransacSms = new SibApiV3Sdk.SendTransacSms();


sendTransacSms = {
    "sender":"MyTest",
    "recipient":"+375296543970",
    "content":"newTest",
};

// async function start(){
//     try {
//         const data = await apiInstance.apiInstance.sendTransacSms(sendTransacSms);
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }
// start()
apiInstance.sendTransacSms(sendTransacSms).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});