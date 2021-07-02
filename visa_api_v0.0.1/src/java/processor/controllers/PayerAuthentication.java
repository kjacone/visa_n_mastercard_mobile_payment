/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package processor.controllers;

import LogEngine.LogEngine;
import com.google.gson.Gson;
import configs.Config;
import helpers.CommonFunctions;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;
import org.json.JSONException;
import org.json.JSONObject;
import processor.models.PayerAuthenticationModel;

/**
 *
 * @author kjacone
 *
 * Explanation
 *
 * Check payer authentication is the API used to check if the cardholder has
 * been enrolled for 3DS, the response data will then be used for the further
 * authentication process. If the issuing bank requires step-up (token
 * generation for further authentication) the response will contains ACS URL,
 * authentication transaction ID and transaction id (xid).
 *
 */
public final class PayerAuthentication extends MustHave {

    Gson gson = new Gson();

    public PayerAuthentication() {

    }

    @Override
    public String sendData(String incoming_request) {
        JSONObject js = new JSONObject();
        try {
              js = new CommonFunctions().uploadToServer(Config.AUTH,incoming_request);
        } catch (IOException | JSONException ex) {
              CommonFunctions.ex_logger(ex);
        }
         return js.toString();
    }

    @Override
    public String createRequestBody(JSONObject incoming_request) throws JSONException {

        PayerAuthenticationModel pam = new PayerAuthenticationModel();
        HashMap<String, String> incoming_request_hash = cf.jsonToHashMap(incoming_request);
        pam.setClientReferenceInformation(generateUUID());
//        pam.setClientReferenceInformation("1234568");

        pam.setOrderInformation(incoming_request_hash);
        pam.setPaymentInformation(incoming_request_hash);

       
        //send data
        return sendData(pam.toString());
//        return "";
    }

    @Override
    public String decodeResponseBody(String incoming_response) {
       JSONObject jess= new JSONObject();
            JSONObject jess1 = new JSONObject();
            JSONObject json3DS = new JSONObject();
            
        try {
             jess = new JSONObject(incoming_response);
            
            String status = jess.get("rspCode").toString();
           // jess1.put("status", status);
            if(status.equals("00")){
//            if(status.equalsIgnoreCase("PENDING_AUTHENTICATION")){
               // System.out.println("***** to 3DS");
                json3DS.put("acsUrl", jess.getJSONObject("consumerAuthenticationInformation").get("acsUrl").toString());
                json3DS.put("TermUrl", jess.getString("ReturnUrl"));
                json3DS.put("xid", jess.getJSONObject("consumerAuthenticationInformation").get("xid").toString());
                json3DS.put("pareq", jess.getJSONObject("consumerAuthenticationInformation").get("pareq").toString());
                
//                new CommonFunctions().uploadTo3DS(json3DS);
                
            json3DS.put("f48","complete authentication process");
            json3DS.put("f39",status);
//            jess1.put("id", jess.get("id"));
//            jess1.put("acsUrl", jess.getJSONObject("consumerAuthenticationInformation").get("acsUrl").toString());
            
            }else{
//             json3DS.put("f48",jess.getJSONObject("errorInformation").get("message"));
             json3DS.put("f48",jess.getString("Message"));
            json3DS.put("f39",status);
            }
            
        } catch (JSONException ex) {
           CommonFunctions.ex_logger(ex);
        }
        return json3DS.toString();
    }
 public String generateUUID() {
        return UUID.randomUUID().toString();
    }
 
 
 
}
