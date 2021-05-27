package processor;

import LogEngine.LogEngine;
import com.google.gson.Gson;
import configs.Config;
import helpers.CommonFunctions;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.json.JSONException;
import org.json.JSONObject;
import org.apache.commons.codec.binary.Base64;
import processor.controllers.GetCards;
import processor.controllers.GetTransactions;
import processor.controllers.Login;
import processor.controllers.OTP;
import processor.controllers.PayerAuthentication;
import processor.controllers.Registration;

public class ProcessAppRequests {

    HashMap responseBuffer = new HashMap();
    HashMap where = new HashMap();
    HashMap field = new HashMap();
    HashMap request = new HashMap();
    HashMap<String, String> bufferMap = new HashMap<>();
    HashMap hm = new HashMap();
    HashMap constantAccountDetails = new HashMap();

    HashMap hmsms = new HashMap();
    String response = "", NMbPhone = "", NMBPassword = "", NMBDeviceId = "", NMBIMSI, OS = "";
    Iterator dataLength;
    public static final String USER_AGENT = "Mozilla/5.0";
    private final String currentKey = "";
    private LogEngine el;
    private String responseFromApi;
    private String backendAppAndroidVersion;
    private String backendAppIOSVersion;
    private JSONObject deviceInfo = new JSONObject();
    private JSONObject mnoSession_data = new JSONObject();
    private JSONObject esbRequest_data = new JSONObject();
    private JSONObject transaction_data = new JSONObject();
    ExecutorService pool = Executors.newFixedThreadPool(50);
    CommonFunctions comonFunctions = new CommonFunctions();
    private String[] tokenComponents;
    String final_response = "";

    public HashMap ProcessRequests(String xmlMessage, String token) {

        try {

            tokenComponents = token.split("\\|");
            JSONObject jsonObj = new JSONObject(xmlMessage);

            mnoSession_data = jsonObj.getJSONObject("mnoSession");
            esbRequest_data = jsonObj.getJSONObject("esbRequest");
            transaction_data = esbRequest_data.getJSONObject("data");

            if (esbRequest_data.has("deviceInfo")) {
                deviceInfo = new JSONObject(esbRequest_data.getJSONObject("deviceInfo").toString());
            }

            Integer proCode = Integer.parseInt(esbRequest_data.get("f3").toString());

//              Send data for processing according to procode
            switch (proCode) {
                case 1001://card Registration
                    PayerAuthentication payerAuthentication = new PayerAuthentication();
                    response = payerAuthentication.createRequestBody(transaction_data);
                    final_response = payerAuthentication.decodeResponseBody(response);
                    responseBuffer.put("ignoresms", "0");
                    responseBuffer.put("webview", true);
                    responseBuffer.put("0", final_response);

                    break;
                case 1002://Authentication OTP
                    //  checkDeviceVersion();
                    OTP otp = new OTP();
                    response = otp.createRequestBody(transaction_data);
                    final_response = otp.decodeResponseBody(response);
                    responseBuffer.put("ignoresms", "0");
                    responseBuffer.put("0", final_response);
                    break;

                case 1003://Registration Request
                    Registration reg = new Registration();
                    transaction_data.put("deviceInfo", deviceInfo);
                    transaction_data.put("imsi", mnoSession_data.get("imsi"));
                    response = reg.createRequestBody(transaction_data);
                    final_response = reg.decodeResponseBody(response);
                    responseBuffer.put("ignoresms", "0");
                    responseBuffer.put("0", final_response);
                    break;

                case 1004: //Login Request
                    Login login = new Login();
                    transaction_data.put("deviceInfo", deviceInfo);
                    transaction_data.put("imsi", mnoSession_data.get("imsi"));
                    response = login.createRequestBody(transaction_data);
                    final_response = login.decodeResponseBody(response);

                    responseBuffer.put("ignoresms", "0");
                    responseBuffer.put("0", final_response);
                    break;
                case 1005: //Get Cards
                    GetCards getCards = new GetCards();
                    transaction_data.put("deviceInfo", deviceInfo);
                    transaction_data.put("imsi", mnoSession_data.get("imsi"));
                    response = getCards.createRequestBody(transaction_data);
                    final_response = getCards.decodeResponseBody(response);
                    responseBuffer.put("ignoresms", "0");
                    responseBuffer.put("0", final_response);
                    break;

                case 1006: //Get Recent Transactions
                    GetTransactions getTransactions = new GetTransactions();
                    transaction_data.put("deviceInfo", deviceInfo);
                    transaction_data.put("imsi", mnoSession_data.get("imsi"));
                    response = getTransactions.createRequestBody(transaction_data);
                    final_response = getTransactions.decodeResponseBody(response);
                    responseBuffer.put("ignoresms", "0");
                    responseBuffer.put("0", final_response);
                    break;

                default:
                    hm.clear();
                    hm.put("f48", "Invalid Procode");
                    hm.put("f39", "101");
                    responseBuffer.put("ignoresms", "1");
                    responseBuffer.put("0", hm);
                    break;
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
            hm.clear();
            hm.put("f48", CommonFunctions.getLanguage(OS, "error_occured"));
            hm.put("f39", "102");
            responseBuffer.put("ignoresms", "1");
            responseBuffer.put("0", hm);
        }
        return responseBuffer;
    }

    private void checkDeviceVersion() {

        try {
            //check versions of every device
            switch (deviceInfo.get("OS").toString()) {
                case "Android":
                    backendAppAndroidVersion = Config.ANDROID_VERSION_PILOT;
                    break;
                case "IOS"://
                    backendAppIOSVersion = Config.IOS_VERSION_PILOT;
                    break;
                default:
                    break;
            }

            // .  check if its PIlot and get Language
            String pilot_status = (esbRequest_data.has("pilot")) ? esbRequest_data.getString("pilot") : "false";
            String lang = mnoSession_data.has("lang") ? mnoSession_data.get("lang").toString() : "ki";
            String appVersion = mnoSession_data.has("appVersion") ? mnoSession_data.get("appVersion").toString().trim() : "";

            String customeAndroidVersion = (deviceInfo.has("Version") ? deviceInfo.get("Version").toString().trim() : "1.0.0");
            if (!backendAppAndroidVersion.equalsIgnoreCase(appVersion) && backendAppIOSVersion.isEmpty()) {
                responseBuffer.clear();
                field.clear();
                field.put("field39", "57");
                field.put("field48", "Please update your Android app to continue using this service");
                responseBuffer.put("0", field);
                responseBuffer.put("ignoresms", "1");

            }
            if (!backendAppIOSVersion.equalsIgnoreCase(appVersion) && backendAppAndroidVersion.isEmpty()) {
                responseBuffer.clear();
                field.clear();
                field.put("field39", "57");
                field.put("field48", "Please update your IOS app to continue using this service");
                responseBuffer.put("0", field);
                responseBuffer.put("ignoresms", "1");

            }
            if (!(comonFunctions.hmacDigest(Base64.encodeBase64String((field.get("37") + tokenComponents[1]).getBytes()))).equalsIgnoreCase(tokenComponents[0])) {
                responseBuffer.clear();
                field.clear();
                field.put("field39", "57");
                field.put("field48", "Invalid request token");
                responseBuffer.put("0", field);
                responseBuffer.put("ignoresms", "1");
                LogEngine el = new LogEngine("InvalidClientCustomerINQ", new Gson().toJson(responseBuffer));
                el.log();

            } else {
                responseBuffer.clear();
                field.clear();

            }

        } catch (JSONException ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine log = new LogEngine(sw.toString());
            log.log();

        }

    }
}
