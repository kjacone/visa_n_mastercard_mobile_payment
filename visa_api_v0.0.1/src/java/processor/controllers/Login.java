/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package processor.controllers;

import configs.Config;
import helpers.CommonFunctions;
import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author kjacone
 */
public class Login  extends MustHave {

      @Override
    public String sendData(String incoming_request) {
        JSONObject js = new JSONObject();
        try {
              js = new CommonFunctions().uploadToServer(Config.LOGIN,incoming_request);
        } catch (IOException | JSONException ex) {
              CommonFunctions.ex_logger(ex);
        }
         return js.toString();
    }

    @Override
    public String createRequestBody(JSONObject incoming_request) throws JSONException {
     JSONObject pam = new JSONObject();
     pam.put("mobileNr",incoming_request.get("phoneNumber"));
     pam.put("imei",incoming_request.get("imsi"));
     pam.put("userPin",incoming_request.get("enc_pin"));
     pam.put("deviceInfo",incoming_request.getJSONObject("deviceInfo"));
        
        return sendData(pam.toString());   
    
    }

    @Override
    public String decodeResponseBody(String incoming_response) {
    
        JSONObject jess;
        JSONObject jess1 = new JSONObject();
        try {
            jess = new JSONObject(incoming_response);

            String rspCode = jess.getString("rspCode");
            if (rspCode.equalsIgnoreCase("00")) {
                jess1.put("f48", "Login was successfuul");
                jess1.put("token", "erssfdfsfseeerweeeeeeeewwwwwwwwwwwsfdg");
                jess1.put("f39", "00");
               
            } else {
                jess1.put("f48",  jess.getString("rspMessage"));
                jess1.put("f39", jess.getString("rspCode"));

            }

        } catch (JSONException e) {
            
  CommonFunctions.ex_logger(e);
        }
        return jess1.toString();
    }
    
}
