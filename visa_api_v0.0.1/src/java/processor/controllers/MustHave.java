/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package processor.controllers;

import LogEngine.LogEngine;
import helpers.CommonFunctions;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author kjacone
 */
public abstract class MustHave {

    Map<String, String> request = new HashMap<>();
    JSONObject jr;
    String response = "";
    LogEngine log;
    CommonFunctions cf = new CommonFunctions();

 public   abstract String sendData(String incoming_request);

  public  abstract String createRequestBody(JSONObject incoming_request) throws JSONException ;

  public  abstract String decodeResponseBody(String incoming_response);
    
    
    
    
   

}
