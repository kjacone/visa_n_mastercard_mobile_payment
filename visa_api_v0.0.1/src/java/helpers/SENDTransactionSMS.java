/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package helpers;

import LogEngine.LogEngine;
import configs.Config;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;

/**
 *
 * @author kjacone
 */
public class SENDTransactionSMS {

    HashMap responseMessage;
    HashMap where = new HashMap();
    HashMap field = new HashMap();
    HashMap cols = new HashMap();
    HashMap smsData = new HashMap();
    HashMap smsResponse = new HashMap();
    HashMap request = new HashMap();
    HashMap smsHash = new HashMap();
    HashMap trnDetails = new HashMap();
    String message;
    Integer numberOfSMSs;
    String smsKey;
    HashMap<String, HashMap<String, String>> smsDetails = new HashMap<>();
   
    CommonFunctions comonFunctions = new CommonFunctions();

    public SENDTransactionSMS(HashMap response) {
        responseMessage = response;
    }

    public void sendSMS() {
        //get sms to send
        LogEngine el;

        try {
            String pilot_status = (responseMessage.containsKey("pilot")) ? responseMessage.get("pilot").toString() : "false";
            String lang = responseMessage.containsKey("LANG") ? responseMessage.get("LANG").toString().trim() : "ki";

            if (responseMessage.containsKey("LANG")) {
                if (responseMessage.get("LANG").toString().trim().equalsIgnoreCase("sw")) {
                    responseMessage.replace("LANG", "ki");
                } else if (responseMessage.get("LANG").toString().trim().equals("en")) {
                    responseMessage.replace("LANG", "en");
                } else {
                    responseMessage.replace("LANG", "en");
                }
            } else {
                responseMessage.replace("LANG", "ki");

            }
//            lang =lang.equalsIgnoreCase("sw") ? "ki":lang;
//             responseMessage.put("LANG", lang);

//             el = new LogEngine("LANGUAGE", responseMessage.get("LANG","ki"));
//            el.log();
//            
            el = new LogEngine("SENDTransactionSMS", responseMessage.toString());
            el.log();

            switch (Integer.parseInt(responseMessage.get("f3").toString().substring(0, 2))) {
                case 1:

                default:
                    SendSMS(simulateSMS(responseMessage));

                    break;
            }
            //.substring(12)

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            el = new LogEngine(sw.toString());
            el.log();
        }
    }

    private String SendSMS(HashMap<String, String> smsFields) {
        String resp = "";
        try {
            request.put("request_type", "POST");
            request.put("queryString", new CommonFunctions().getXML(smsFields));
            request.put("ttype", "Registration");
            request.put("url", Config.SMSWSURL);
            smsResponse = new CommonFunctions().esbXmlBreaker(new CommonFunctions().SendHTTPRequest(request));
            resp = smsResponse.toString();
            LogEngine el = new LogEngine("SENT_SMS", resp);
            el.log();
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return resp;
    }

    private HashMap<String, String> simulateSMS(HashMap<String, String> request) {

        smsResponse.clear();
        smsResponse.put("field48", "Successfully Posted");
        smsResponse.put("field39", "00");
        smsResponse.put("field104", "this is a simulated msg");
        smsResponse.put("field65", request.get("65"));
        smsResponse.put("field0", "0200");

        return smsResponse;
    }
}
