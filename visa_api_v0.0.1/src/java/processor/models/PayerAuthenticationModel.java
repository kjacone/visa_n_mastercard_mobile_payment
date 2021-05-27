/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package processor.models;

import LogEngine.LogEngine;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author kjacone
 */
public class PayerAuthenticationModel {

    public JSONObject clientReferenceInformation;
    public JSONObject orderInformation;
    public JSONObject paymentInformation;
    private LogEngine el;
    private StringWriter sw;

    public JSONObject getClientReferenceInformation() {
        return clientReferenceInformation;
    }

    public void setClientReferenceInformation(String code) {

        try {

            this.clientReferenceInformation = new JSONObject();
            JSONObject clientReferenceInformation_1 = new JSONObject();
            clientReferenceInformation_1.put("code", code);// "thirdPartyId":"CNPSOURCE",
  
            this.clientReferenceInformation.put("clientReferenceInformation", clientReferenceInformation_1);

        } catch (JSONException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            el = new LogEngine(sw.toString());
            el.log();
        }

    }

    public JSONObject getOrderInformation() {
        return orderInformation;
    }

    public void setOrderInformation(HashMap<String, String> orderInformation) {
        try {
            this.orderInformation = new JSONObject();
            JSONObject orderInformation_1 = new JSONObject();
            JSONObject orderInformation_2 = new JSONObject();
            JSONObject orderInformation_3 = new JSONObject();

            //amount details
            orderInformation_2.put("totalAmount", "1.00");
            orderInformation_2.put("currency", "TZS");
            //personal_details
            orderInformation_1.put("country", orderInformation.get("country"));
            orderInformation_1.put("firstName", orderInformation.get("firstName"));
            orderInformation_1.put("lastName", orderInformation.get("lastName"));
//            orderInformation_1.put("phoneNumber", orderInformation.get("phoneNumber"));
            orderInformation_1.put("phoneNumber", "255767144609");
//            orderInformation_1.put("address2", orderInformation.get("address2"));
//            orderInformation_1.put("address1", orderInformation.get("address1"));
//            orderInformation_1.put("postalCode", orderInformation.get("postalCode"));
//            orderInformation_1.put("locality", orderInformation.get("locality"));
//            orderInformation_1.put("administrativeArea", orderInformation.get("administrativeArea"));
            orderInformation_1.put("email", orderInformation.get("email"));

            orderInformation_3.put("billTo", orderInformation_1);
            orderInformation_3.put("amountDetails", orderInformation_2);

            this.orderInformation.put("orderInformation", orderInformation_3);
        } catch (JSONException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            el = new LogEngine(sw.toString());
            el.log();
        }

    }

    public JSONObject getPaymentInformation() {
        return paymentInformation;
    }

    public void setPaymentInformation(HashMap<String, String> paymentInformation) {
        try {
            this.paymentInformation = new JSONObject();
            JSONObject paymentInformation_1 = new JSONObject();
            JSONObject paymentInformation_2 = new JSONObject();
            String expiry =paymentInformation.get("expiry");
          String  exp_year = (expiry.length() >= 6)? expiry.substring(2, 6): expiry.substring(1, 5);
          String  exp_month = (expiry.length() >= 6)? expiry.substring(0, 2): "0"+expiry.substring(0, 1);
            paymentInformation_1.put("expirationYear", exp_year);
            paymentInformation_1.put("number", paymentInformation.get("number"));
            paymentInformation_1.put("expirationMonth", exp_month);
            paymentInformation_1.put("type", "001");
            paymentInformation_1.put("cvv2", "123");
            paymentInformation_2.put("card", paymentInformation_1);
            this.paymentInformation.put("paymentInformation", paymentInformation_2);
        } catch (JSONException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            el = new LogEngine(sw.toString());
            el.log();
        }

    }

    @Override
    public String toString() {
        try {
            JSONObject jo = new JSONObject();
              jo.put("thirdPartyId", "CNPSOURCE");
            jo.put("clientReferenceInformation",clientReferenceInformation.get("clientReferenceInformation"));
            jo.put("orderInformation",orderInformation.get("orderInformation"));
            jo.put("paymentInformation",paymentInformation.get("paymentInformation"));
            return jo.toString();
        } catch (JSONException e) {
           sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            el = new LogEngine(sw.toString());
            el.log();
            return null;
        }
    }

}
