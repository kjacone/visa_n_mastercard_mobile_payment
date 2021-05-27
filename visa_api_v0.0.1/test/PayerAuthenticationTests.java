
import java.io.FileReader;
import org.json.JSONObject;
import processor.controllers.PayerAuthentication;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author kjacone
 */
public class PayerAuthenticationTests {

    public static final void main(String[] args) throws Exception {
        System.out.println("Hello World");

        //Read JSON file 
        //  Object obj = jsonParser.parse(reader);
        //    JSONObject data = (JSONObject) obj;
        //    System.out.println(data.toString());
        PayerAuthentication payerAuthentication = new PayerAuthentication();
        
        
      String response =  payerAuthentication.createRequestBody(new JSONObject("{\n"
                + "         \"country\":\"US\",\n"
                + "         \"firstName\":\"John\",\n"
                + "         \"lastName\":\"Doe\",\n"
                + "         \"phoneNumber\":\"255767525465\",\n"
                + "         \"address2\":\"Address 2\",\n"
                + "         \"address1\":\"1 Market St\",\n"
                + "         \"postalCode\":\"94105\",\n"
                + "         \"locality\":\"san francisco\",\n"
                + "         \"administrativeArea\":\"CA\",\n"
                + "         \"email\":\"test@cybs.com\",\n"
                + "         \"transaction_code\":\"1234455666\",\n"
                + "         \"totalAmount\":\"1.0\",\n"
                + "         \"currency\":\"TZS\",    \n"
                + "          \"expirationYear\":\"2022\",\n"
                + "         \"number\":\"4000000000000002\",\n"
                + "         \"expirationMonth\":\"12\",\n"
                + "         \"type\":\"001\"\n"
                + "}"));
      
      
    String final_response =  payerAuthentication.decodeResponseBody(response);
        System.out.println("Response_to_app: \n"+final_response);

    }
}
