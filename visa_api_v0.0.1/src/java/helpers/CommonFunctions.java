/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package helpers;

import LogEngine.LogEngine;
import configs.Config;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.RuleBasedCollator;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 *
 * @author kjacone
 */
public class CommonFunctions {

    HashMap fields = new HashMap();
    HashMap hm = new HashMap();
    Iterator dataLength;
    public static final String USER_AGENT = "Mozilla/5.0";
    String currentKey = "";
    HashMap userInput = new HashMap();
    Iterator dataLength2;

    private LogEngine el;

    public CommonFunctions() {

    }

    public HashMap jsonToHashMap(JSONObject jsonDetails) {
        try {
            fields.clear();
            dataLength = jsonDetails.keys();
            currentKey = "";
            while (dataLength.hasNext()) {
                currentKey = (String) dataLength.next();
                if (currentKey.equals("4")) {
                    jsonDetails.put(currentKey, jsonDetails.get("4").toString().replaceAll(",", ""));
                }
                fields.put(currentKey, jsonDetails.get(currentKey).toString());
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            el = new LogEngine(sw.toString());
            el.log();

        }
        return fields;
    }

    public HashMap jsonToHashMapUserInput(JSONObject jsonDetails) {
        try {
            userInput.clear();
            dataLength2 = jsonDetails.keys();
            currentKey = "";
            while (dataLength2.hasNext()) {
                currentKey = (String) dataLength2.next();
                if (currentKey.equals("4")) {
                    jsonDetails.put(currentKey, jsonDetails.get("4").toString().replaceAll(",", ""));
                }
                userInput.put(currentKey, jsonDetails.get(currentKey).toString());
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();

        }
        return userInput;
    }

    public HashMap getErrorMessage(HashMap requestMap) {
        String field48 = "";
        if (requestMap.containsKey("field39")) {
            String field39 = requestMap.get("field39").toString();
            switch (field39) {

                case "30":
                    field48 = "Payment reference number is missing";
                    break;

                case "79":
                    field48 = "Invalid Currency";
                    break;

                case "51":
                    field48 = "Your account has Insufficient funds to complete this transaction";
                    break;

                case "57":
                    field48 = "Your transaction has failed.Please try again later.";
                    if (getINQ(requestMap.get("field100").toString()).endsWith("INQ")) {
                        field48 = requestMap.get("field48").toString();
                    }
                    break;

                case "73":
                    field48 = "Cancelled invoice";
                    break;

                case "91":
                    field48 = "Issuer not available";
                    break;

                case "80":
                    field48 = "Could not update balance";
                    break;

                case "52":
                    field48 = "Dormant account";
                    break;

                case "32":
                    field48 = "No debits";
                    break;

                case "11":
                    field48 = "Invalid GL or bank accoun";
                    break;

                case "12":
                    field48 = "Invalid recipient account";
                    break;

                case "13":
                    field48 = "Image not available for customer";
                    break;

                case "14":
                    field48 = "Error occurred while processing utility transaction";
                    break;

                case "15":
                    field48 = "Account to same account transfer not allowed";
                    break;
                case "94":
                    field48 = "Duplicate transaction detected";
                    break;
                case "61":
                    field48 = "Limit  has been exceeded";
                    break;
                default:
                    field48 = requestMap.get("field48").toString();

            }
            requestMap.put("field48", field48);

        }

        return requestMap;
    }

    public Map<String, String> ParseXml(String xmlString) {
        Map<String, String> fields = new HashMap();
        try {
            DocumentBuilderFactory dbf
                    = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            InputSource is = new InputSource();
            is.setCharacterStream(new StringReader(xmlString));

            Document doc = db.parse(is);
            NodeList nodes = doc.getElementsByTagName("message");

            for (int k = 0; k < nodes.getLength(); k++) {

                NodeList nodelt = doc.getElementsByTagName("field");

                // iterate the nodes
                for (int i = 0; i < nodelt.getLength(); i++) {
                    Element m = (Element) nodelt.item(i);
                    String id = m.getAttribute("id");
                    String value = m.getAttribute("value");

                    fields.put(id, value);
                }
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return fields;
    }

    public HashMap esbXmlBreaker(String xml) {
        //String Myresponse = "";
        try {
            hm.clear();
            String CleanXML = stripNonValidXMLCharacters(xml);
            InputStream file = new ByteArrayInputStream(CleanXML.getBytes(Charset.forName("UTF-8")));
            if (!xml.contains("ERR@")) {
                DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                Document doc = dBuilder.parse(file);
                doc.getDocumentElement().normalize();
                NodeList nodes = doc.getElementsByTagName("*");
                Node node;
                int nodeCount = nodes.getLength();
                for (int i = 0; i < nodeCount; i++) {
                    node = nodes.item(i);
                    if (!"message".equals(node.getNodeName()) && !"isomsg".equals(node.getNodeName())) {
                        hm.put("field" + node.getAttributes().getNamedItem("id").getNodeValue(), node.getAttributes().getNamedItem("value").getNodeValue());
                    }
                }
            }
//            ProcessTransaction(hm);
            return hm;

        } catch (ParserConfigurationException | SAXException | IOException | DOMException ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString() + xml);
            el.log();
        }
        return hm;
    }

    public String stripNonValidXMLCharacters(String in) {
        StringBuffer out = new StringBuffer(); // Used to hold the output.
        char current; // Used to reference the current character.
        if (in == null || ("".equals(in))) {
            return ""; // vacancy test.
        }
        for (int i = 0; i < in.length(); i++) {
            current = in.charAt(i); // NOTE: No IndexOutOfBoundsException caught here; it should not happen.
            if ((current == 0x9)
                    || (current == 0xA)
                    || (current == 0xD)
                    || ((current >= 0x20) && (current <= 0xD7FF))
                    || ((current >= 0xE000) && (current <= 0xFFFD))
                    || ((current >= 0x10000) && (current <= 0x10FFFF))) {
                out.append(current);
            }
        }
        return out.toString();
    }

    public String getINQ(String field100) {
        String inq = field100;
        if (field100.length() > 3) {
            inq = field100.substring(field100.length() - 3);
        }
        return inq;
    }

    public String getXML(Map<String, String> msgFields) {
        String strXML = "";
        String value;
        try {
            if (!msgFields.isEmpty()) {
                strXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
                strXML += "<message>";
                strXML += "<isomsg direction=\"request\">";
                strXML += "<authHeader sourceid='" + Config.MOBILEESBAPPUser + "' password='" + Config.MOBILEESBPassword + "'/>";

                for (String key : msgFields.keySet()) {
                    value = msgFields.get(key);
                    if (value != null) {
                        strXML += "<field id='" + key + "' value='" + value + "' />";
                        //strXML += "<field id=\"" + key + "\" value=\"" + value + "\" />";
                    }
                }
                strXML += "</isomsg>";
                strXML += "</message>";
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return strXML;
    }

    public Map<String, String> GetParams(HashMap parameters) {
        Map<String, String> params = new LinkedHashMap();

        return params;
    }

    public List orderBanks(List<String> mycList) {

        try {

            String rules = "<CRDB<NBC<EQUITY<AKIBA<BARCLAYS<EXIM<AMANA<STANBIC<FNB"
                    + "<DTB<STANDARD<AZANIA<DCB<MAENDELEO<ADVANCE<TIB<BANK<I<GUARANTY<GTBANK<CHINA<KCB<CBA<HABIB<ABC<BOA<BOT<BANK<CANARA<CITIBANK<ECOBANK"
                    + "<FINCA<KILIMANJARO<MAENDELEO<MWALIMU<ACCESS<MKOMBOZI<MUCOBA<MWANGA<PEOPLE<NIC<TPB<TRA<TWB<TWIGA<UCHUMI<UNITED<UBL<UBFA";

            RuleBasedCollator ruleBasedCollator = new RuleBasedCollator(rules);

            Collections.sort(mycList, ruleBasedCollator);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return mycList;

    }

    public String CreateResponseXML(Map<String, String> msgFields) {
        String strXML = "";
        String value;
        try {
            if (!msgFields.isEmpty()) {
                strXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
                strXML += "<message>";
                strXML += "<isomsg direction=\"request\">";
                for (String key : msgFields.keySet()) {
                    value = msgFields.get(key);
                    if (value != null) {
                        strXML += "<field id=\"" + key + "\" value=\"" + value + "\" />";
                    }
                }
                strXML += "</isomsg>";
                strXML += "</message>";
            }

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return strXML;
    }

    public String SendHTTPRequest(Map<String, String> result) {
        String resp = "";
        try {
            LogEngine requestLog = new LogEngine("HTTP_REQUEST_RESPONSE", "REQUEST>>>" + result);
            requestLog.log();
            String url = result.get("url");
            HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

            con.setRequestMethod(result.get("request_type"));
            con.setRequestProperty("User-Agent", USER_AGENT);
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
            int connectTimeout = result.containsKey("connect_timeout") ? Integer.parseInt(result.get("connect_timeout")) : 5000;
            int readTimeout = result.containsKey("read_timeout") ? Integer.parseInt(result.get("read_timeout")) : 60000;
            con.setConnectTimeout(connectTimeout);
            con.setReadTimeout(readTimeout);
            int responseCode;
            if ("POST".equals(result.get("request_type"))) {
                con.setDoOutput(true);
                DataOutputStream wr = new DataOutputStream(con.getOutputStream());
                wr.writeBytes(result.get("queryString"));
                wr.flush();
                wr.close();

            }
            if ("GET".equals(result.get("request_type"))) {
                Map<String, String> params = new LinkedHashMap();
                params.put("username", Config.MOBILEESBAPPUser);//
                params.put("password", Config.MOBILEESBPassword);
                params.put("sourceId", "VISA_MOBILE");
                params.put("account", result.get("queryString"));

                StringBuilder postData = new StringBuilder();
                for (Map.Entry<String, String> param : params.entrySet()) {
                    if (postData.length() != 0) {
                        postData.append('&');
                    }
                    postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
                    postData.append('=');
                    postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
                }

                byte[] postDataBytes = postData.toString().getBytes("UTF-8");
                con.setDoOutput(true);
                con.getOutputStream().write(postDataBytes);
            }
            responseCode = con.getResponseCode();

            if (responseCode != 200) {
//                System.out.println("Request sent to " + url + " Failed Response Code : " + responseCode);
            }

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
//            System.out.println("Response-  \n" + result.get("ttype") + ":   " + response);
            in.close();
            resp = response.toString();
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
            resp = e.getMessage();
        }
        LogEngine responseLog = new LogEngine("HTTP_REQUEST_RESPONSE", "RESPONSE>>>" + resp);
        responseLog.log();
        return resp;
    }

    public String GetFutureDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:MM:ss");
        Calendar cal = Calendar.getInstance();
        String time = (sdf.format(cal.getTimeInMillis()));
        return time;
    }

    public String GetHistoryDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        String time = (sdf.format(cal.getTimeInMillis()));
        return time;
    }

    public String randomTokenGenerator() {
        List numbers = new ArrayList();
        for (int i = 0; i < 10; i++) {
            numbers.add(i);
        }
        Collections.shuffle(numbers);

        String result = "";
        for (int i = 0; i < 4; i++) {
            result += numbers.get(i).toString();
        }
        return result;
    }

    public String randGenerator(int numsize) {
        List numbers = new ArrayList();
        for (int i = 0; i < 10; i++) {
            numbers.add(i);
        }
        Collections.shuffle(numbers);

        String result = "";
        for (int i = 0; i < numsize; i++) {
            result += numbers.get(i).toString();
        }
        return result;
    }

    public String hmacDigest(String msg) {
        String digest = null;
        String keyString = "secret";
        try {//sha256
            SecretKeySpec key = new SecretKeySpec((keyString).getBytes("UTF-8"), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(key);

            byte[] bytes = mac.doFinal(msg.getBytes("ASCII"));

            StringBuffer hash = new StringBuffer();
            for (int i = 0; i < bytes.length; i++) {
                String hex = Integer.toHexString(0xFF & bytes[i]);
                if (hex.length() == 1) {
                    hash.append('0');
                }
                hash.append(hex);
            }
            digest = hash.toString();
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return digest;
    }

    protected String getRandomToken() {
        String characters = "1Q23X4Y56Z78M9";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 6) { // length of the random string.
            int index = (int) (rnd.nextFloat() * characters.length());
            salt.append(characters.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }

    public String getStringFromInputStream(InputStream is) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();

        String line;
        try {

            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {

                }
            }
        }
        return sb.toString();
    }

    public static void post(String url, String json) throws Exception {
        String charset = "UTF-8";
        URLConnection connection = new URL(url).openConnection();
        connection.setDoOutput(true); // Triggers POST.
        connection.setRequestProperty("Accept-Charset", charset);
        connection.setRequestProperty("Content-Type", "application/json;charset=" + charset);

        try (OutputStream output = connection.getOutputStream()) {
            output.write(json.getBytes(charset));
        }

        InputStream response = connection.getInputStream();
        System.out.println("RESPONSE \n" + response);

    }

    public String postJson(String respMsg, String endPoint, String token) {
        String reply = "no response";
        try {
            URL url = new URL(endPoint);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            // set up url connection to get retrieve information back
            con.setRequestMethod("POST");
            con.setDoInput(true);
            con.setDoOutput(true);
            // stuff the Authorization request header
            con.setRequestProperty("Connection", "close");
            con.setRequestProperty("token", token);

            con.setRequestProperty("Content-Type", "application/json");
            //  con.setRequestProperty("Content-Length", String.valueOf(respMsg.getBytes("UTF-8").length));
            con.setConnectTimeout(5000);
            con.setReadTimeout(5000);
            OutputStream out = con.getOutputStream();
            out.write(respMsg.getBytes("UTF-8"));
            out.close();

            // pull the information back from the URL
            InputStream is = null;
            if (con.getResponseCode() == 200) {
                is = con.getInputStream();
            } else {
                is = con.getErrorStream();
            }
            reply = getStringFromInputStream(is);

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return reply;
    }

    public static void ex_logger(Exception e) {
        StringWriter sw = new StringWriter();
        e.printStackTrace(new PrintWriter(sw));
        LogEngine el = new LogEngine(sw.toString());
        el.log();

    }

    public JSONObject uploadToServer(String urlString, String data) throws IOException, JSONException {
        String query = Config.URL + urlString;
        String json = data;

        LogEngine el = new LogEngine("REQUEST_OUT", query + "\n" + data);
        el.log();

        URL url = new URL(query);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(5000);
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestMethod("POST");

        OutputStream os = conn.getOutputStream();
        os.write(json.getBytes("UTF-8"));
        os.close();

        // read the response
        InputStream in = new BufferedInputStream(conn.getInputStream());
        String result = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
        JSONObject jsonObject = new JSONObject(result);

        in.close();
        conn.disconnect();
        el = new LogEngine("RESPONSE_IN", jsonObject.toString());
        el.log();

        return jsonObject;
    }

    
    public JSONObject uploadTo3DS(JSONObject data)  {
        JSONObject jsonObject = new JSONObject();
        System.out.println("*******"+data.toString());
try{
        URL url = new URL(data.getString("acsUrl"));
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(5000);
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestMethod("POST");
        conn.addRequestProperty("PaReq", data.getString("pareq"));
        conn.addRequestProperty("TermUrl", data.getString("TermUrl"));
        conn.addRequestProperty("MD", data.getString("xid"));

//        OutputStream os = conn.getOutputStream();
//        os.write(json.getBytes("UTF-8"));
//        os.close();

        // read the response
        InputStream in = new BufferedInputStream(conn.getInputStream());
        String result = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
//         jsonObject = new JSONObject(result);

        in.close();
        conn.disconnect();
        el = new LogEngine("RESPONSE_IN",result);
        el.log();
}  catch(IOException | JSONException e){
             e.printStackTrace();
                }

        return jsonObject;
    }
    
    public String maskCard(String encodedCard) {
        String maskedCard;
        try {
            String cardEnc = unDecMe(Base64.decodeBase64(encodedCard));
            maskedCard = cardEnc.substring(0, 4) + "********" + cardEnc.substring(12, 16);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
            maskedCard = "Error in Card display";
        }
        return maskedCard;
    }

    public String unDecMe(byte[] message) throws Exception {
        final MessageDigest md = MessageDigest.getInstance("md5");
        final byte[] digestOfPassword = md.digest("STAN201*"
                .getBytes("utf-8"));
        final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
        for (int j = 0, k = 16; j < 8;) {
            keyBytes[k++] = keyBytes[j++];
        }

        final SecretKey key = new SecretKeySpec(keyBytes, "DESede");
        final IvParameterSpec iv = new IvParameterSpec(new byte[8]);
        final Cipher decipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
        decipher.init(Cipher.DECRYPT_MODE, key, iv);

        // final byte[] encData = new
        // sun.misc.BASE64Decoder().decodeBuffer(message);
        final byte[] plainText = decipher.doFinal(message);

        return new String(plainText, "UTF-8");
    }

    public byte[] decMe(String message) throws Exception {
        final MessageDigest md = MessageDigest.getInstance("md5");
        final byte[] digestOfPassword = md.digest("STAN201*".getBytes("utf-8"));
        final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
        for (int j = 0, k = 16; j < 8;) {
            keyBytes[k++] = keyBytes[j++];
        }

        final SecretKey key = new SecretKeySpec(keyBytes, "DESede");
        final IvParameterSpec iv = new IvParameterSpec(new byte[8]);
        final Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, iv);
        final byte[] plainTextBytes = message.getBytes("utf-8");
        final byte[] cipherText = cipher.doFinal(plainTextBytes);
        return cipherText;
    }

    public String DecryptMobileRequest(String key, String initVector, String encrypted) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
            byte[] original = cipher.doFinal(Base64.decodeBase64(encrypted));

            return new String(original);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
            ex.printStackTrace();
            return "";
        }
    }

    public String EncryptMobileRequest(String key, String initVector, String value) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
            byte[] encrypted = cipher.doFinal(value.getBytes());
            return Base64.encodeBase64String(encrypted);
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
            return "";
        }
    }

    public String capitalizeFirstLetter(String original) {
        if (original == null || original.length() == 0) {
            return original;
        }
        return original.substring(0, 1).toUpperCase() + original.substring(1);
    }

    public String formatNumber(String raw) {
        String input = raw.replaceAll(" ", "");
        if (input.trim().length() == 10) {
            input = "255" + input.substring(1, input.trim().length());
        } else if ((input.trim().length() == 12) && (input.trim().substring(0, 3).equalsIgnoreCase("255"))) {
            input.trim();
        } else {
            input = input = raw;
        }
        return input;
    }

    public String GetDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:MM:ss");
        Calendar cal = Calendar.getInstance();
        String time = (sdf.format(cal.getTimeInMillis()));
        return time;
    }

    public String getDateToOracleTimeStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-YY hh.MM.ss.mmmmmmmmm a");
        Calendar cal = Calendar.getInstance();
        String time = (sdf.format(cal.getTimeInMillis()));
        return time.toUpperCase();
    }

    public HashMap NoChargeAccountBalance(HashMap details) {
        JSONObject obj = new JSONObject();
        HashMap request = new HashMap();
        HashMap response = new HashMap();

        try {
            if (details.containsKey("ACCOUNTNUMBER")) {
                LogEngine balanceLog = new LogEngine("CHECKING_BALANCE1", details.toString());
                balanceLog.log();
                obj.put("0", "0200");
                obj.put("2", details.get("msisdn"));
                obj.put("3", "310000");
                obj.put("4", "0");
                obj.put("32", "NMBAPP");
                obj.put("37", randGenerator(8));
                obj.put("100", "BI");
                obj.put("102", details.get("ACCOUNTNUMBER"));
                obj.put("charge", "N");
                HashMap field = jsonToHashMap(obj);
                String esbXmlMessage = getXML(field);
                field.put("request", esbXmlMessage);
                request.put("request_type", "POST");
                request.put("queryString", esbXmlMessage);
                request.put("ttype", field.get("100"));
                request.put("url", Config.ESBWS);
                request.put("connect_timeout", "5000");
                request.put("read_timeout", "100000");
                response = esbXmlBreaker(SendHTTPRequest(request));
                getErrorMessage(response);
                if (response.containsKey("field39") && response.get("field39").equals("00")) {
                    details.put("MAINBALANCE", response.get("field54").toString());
                    details.put("MAINCURRENCY", response.get("field49").toString());
                } else {
                    details.put("MAINBALANCE", "00.00|00.00");
                }
//                details.put("MAINBALANCE", "00.00|00.00");
            } else {
                LogEngine balanceLog = new LogEngine("CHECKING_BALANCE2", details.toString());
                balanceLog.log();
                for (Object key : details.keySet()) {
                    HashMap accMap = (HashMap) details.get(key);
                    String account = accMap.get("ACCOUNTNUMBER").toString();
                    obj.put("0", "0200");
                    obj.put("2", accMap.get("PHONENUMBER"));
                    obj.put("3", "310000");
                    obj.put("4", "0");
                    obj.put("32", "NMBAPP");
                    obj.put("37", randGenerator(8));
                    obj.put("100", "BI");
                    obj.put("102", account);
                    obj.put("charge", "N");
                    HashMap field = jsonToHashMap(obj);
                    String esbXmlMessage = getXML(field);
                    field.put("request", esbXmlMessage);
                    request.put("request_type", "POST");
                    request.put("queryString", esbXmlMessage);
                    request.put("ttype", field.get("100"));
                    request.put("url", Config.ESBWS);
                    request.put("connect_timeout", "5000");
                    request.put("read_timeout", "100000");
                    response = esbXmlBreaker(SendHTTPRequest(request));
                    getErrorMessage(response);
                    if (response.containsKey("field39") && response.get("field39").equals("00")) {
                        accMap.put("BALANCE", response.get("field54").toString());
                        accMap.put("CURRENCY", response.get("field49"));
                    } else {
                        accMap.put("BALANCE", "00.00|00.00");
                        accMap.put("CURRENCY", "TZS");
                    }
//                    accMap.put("BALANCE", "00.00|00.00");
                    details.put(key, accMap);
                    balanceLog = new LogEngine("CHECKING_BALANCE2", details.toString());
                    balanceLog.log();
                }
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return details;
    }

    public HashMap fetchLinkedAccounts(HashMap details) {
        JSONObject obj = new JSONObject();
        HashMap request = new HashMap();
        HashMap response = new HashMap();
        try {
            if (details.containsKey("CIF")) {
                obj.put("0", "0200");
                obj.put("2", details.get("msisdn"));
                obj.put("3", "360000");
                obj.put("4", "0");
                obj.put("32", "NMBAPP");
                obj.put("37", randGenerator(8));
                obj.put("65", details.get("CIF"));
                obj.put("100", "IBCBSACCOUNTLOOKUP");
                obj.put("102", details.get("ACCOUNTNUMBER"));
                obj.put("online", "0");
                HashMap field = jsonToHashMap(obj);
                String esbXmlMessage = getXML(field);
                field.put("request", esbXmlMessage);
                request.put("request_type", "POST");
                request.put("queryString", esbXmlMessage);
                request.put("ttype", field.get("100"));
                request.put("url", Config.ESBWS);
                request.put("connect_timeout", "5000");
                request.put("read_timeout", "100000");
                response = esbXmlBreaker(SendHTTPRequest(request));
                getErrorMessage(response);
                if (response.containsKey("field39") && response.get("field39").equals("00")) {
                    JSONObject field48obj = new JSONObject(response.get("field48").toString());
//                    ESBLog balanceLog = new LogEngine("FETCHING LINKED ACCOUNTS", field48obj.toString());
//                    balanceLog.log();
                    JSONObject finalObj = new JSONObject();
                    Iterator itr = field48obj.keys();
                    JSONObject accountDetail = new JSONObject();
                    String key = null;
                    while (itr.hasNext()) {
                        key = itr.next().toString();
//                        System.out.println("Keys " + key);
                        accountDetail = field48obj.getJSONObject(key);
                        String cutomerAccount = accountDetail.get("CUST_AC_NO").toString() != null ? accountDetail.get("CUST_AC_NO").toString() : "";
//                        System.out.println(cutomerAccount);
                        String accountanaumber = details.get("ACCOUNTNUMBER").toString() != null ? details.get("ACCOUNTNUMBER").toString() : "";
                        if (!accountanaumber.equalsIgnoreCase(cutomerAccount)) {
//                            System.out.println("true " + accountanaumber);
                            finalObj.put(key, field48obj.get(key));
                        } else if (accountanaumber.equalsIgnoreCase(cutomerAccount)) {
                            details.put("MAIN_AC_DESC", accountDetail.get("DESCRIPTION"));
                            details.put("MAIN_AC_CCY", accountDetail.get("CCY"));
                            details.put("MAIN_AC_CLASS", accountDetail.get("ACCOUNT_CLASS"));
                            LogEngine el = new LogEngine("MAIN_AC_CLASS_M", accountDetail.get("ACCOUNT_CLASS").toString());
                            el.log();
                        }

                    }
                    details.put("LINKEDACCOUNTS", finalObj.toString());
                }
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return details;
    }

    public JSONObject postRequest(String urlObj, String request) throws IOException {
        JSONObject responseJson = new JSONObject();
        URL obj = new URL(urlObj);

        try {

            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            int timeout = 60000;
            con.setConnectTimeout(5000);
            con.setReadTimeout(timeout);
            con.setRequestMethod("POST");
            con.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(request);
            int responseCode = con.getResponseCode();
            //  responseJson.put("httpResponseCode", String.valueOf(responseCode));
            StringBuilder response = new StringBuilder();

            if (responseCode == 200) {
                InputStreamReader input = new InputStreamReader(con.getInputStream());
                BufferedReader in = new BufferedReader(input);
                String inputLine = null;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }

            } else {
                InputStreamReader input = new InputStreamReader(con.getErrorStream());
                BufferedReader in = new BufferedReader(input);
                String inputLine = null;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            }
            responseJson.put("rawResponse", response.toString());

        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine log = new LogEngine(sw.toString());
            log.log();
            try {
                responseJson.put("rawResponse", ex.getMessage());

            } catch (JSONException e) {
            }
        }
        LogEngine loger = new LogEngine("responseMap", responseJson.toString());
        loger.log();
        return responseJson;
    }

    static void getRedis() {
//        Redis redis = new Redis();
//        jedis = redis.testServerConnection;

    }

    public static boolean checkifwhitelisted(String NMbPhone) {
//        boolean available = false;
//        try {
//            getRedis();
//            if (testServerConnection.sismember("WHITELIST", NMbPhone)) {
//                available = true;
//            } else {
//                available = false;
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        return true;
    }

    public static boolean allowEFTTISS() throws JSONException {
        Boolean isEFTTISSallowable = false;
        String currentTime = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
        try {

            String openingTime = "01:00:00";
            //String openingTime = Configurations.EFTTISS_STARTTIME;
            Date time1 = new SimpleDateFormat("HH:mm:ss").parse(openingTime);
            Calendar calendar1 = Calendar.getInstance();
            calendar1.setTime(time1);

            //String closingTime = Configurations.EFTTISS_ENDTIME;
            String closingTime = "20:00:00";
            Date time2 = new SimpleDateFormat("HH:mm:ss").parse(closingTime);
            Calendar calendar2 = Calendar.getInstance();
            calendar2.setTime(time2);
            calendar2.add(Calendar.DATE, 1);
            Date d = new SimpleDateFormat("HH:mm:ss").parse(currentTime);
            Calendar calendar3 = Calendar.getInstance();
            calendar3.setTime(d);
            calendar3.add(Calendar.DATE, 1);

            Date x = calendar3.getTime();
            //checkes whether the current time is between 01:00:00 and 20:00:00.
            if (x.after(calendar1.getTime()) && x.before(calendar2.getTime())) {
                isEFTTISSallowable = true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return isEFTTISSallowable;
    }

    public static boolean allowedB2BMenuAccess(String mainAccountClass, JSONObject jsonLinkedAccounts) throws JSONException {
        Boolean allowedAccess = false;
        allowedAccess = accountClassIsCA34OrCA35(mainAccountClass);

        if (!allowedAccess) {
            Iterator<String> keys = jsonLinkedAccounts.keys();

            while (keys.hasNext()) {
                String key = keys.next();

                if (jsonLinkedAccounts.get(key) instanceof JSONObject) {
                    try {
                        JSONObject jsonAccount = new JSONObject(jsonLinkedAccounts.get(key).toString());
                        allowedAccess = accountClassIsCA34OrCA35(jsonAccount.get("ACCOUNT_CLASS").toString());
                    } catch (JSONException ex) {
                        LogEngine el = new LogEngine("ACCOUNTEX", ex.toString());
                        el.log();
                        return false;
                    }
                }
            }
        }

        return allowedAccess;
    }

    private static boolean accountClassIsCA34OrCA35(String accountClass) {
        Boolean accountClassIsCA34OrCA35 = false;
        if (accountClass.equalsIgnoreCase("CA34") || accountClass.equalsIgnoreCase("CA35")) {
            accountClassIsCA34OrCA35 = true;
        }
        return accountClassIsCA34OrCA35;
    }

    public static JSONObject formatFDRRates(List<String> ratesList) {
        JSONObject array = new JSONObject();

        Iterator iter = ratesList.iterator();
        int x = 0;
        while (iter.hasNext()) {
            try {
                JSONObject obj = new JSONObject();
                Map<String, String> map = new HashMap<>();
                String[] pair = iter.next().toString().split("\\|");
                String[] innerDetails = pair[3].split("\\,");

                for (String item : innerDetails) {
                    String[] test = item.split("\\=");
                    map.put(test[0], test[1]);
                }
                obj.put("range", pair[0]);
                obj.put("min", pair[1]);
                obj.put("max", pair[2]);
                obj.put("periods", map);
                array.put("" + x, obj);
                x++;
            } catch (JSONException ex) {
                Logger.getLogger(CommonFunctions.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return array;
    }

    public static Double calculateFDRRate(JSONObject rates, String Name, Integer Amount) {
        Double percentageRate = 0.0;
        try {
            String period = getPeriod(Name);
            JSONObject selectedRange = rates.getJSONObject("0");
            Iterator keys = rates.keys();
            while (keys.hasNext()) {
                try {
                    Object key = keys.next();
                    JSONObject value = rates.getJSONObject((String) key);
                    if (Amount >= Integer.parseInt(value.getString("min")) && Amount <= Integer.parseInt(value.getString("max"))) {
                        selectedRange = value;
                    }
                } catch (JSONException ex) {
                    Logger.getLogger(CommonFunctions.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            JSONObject periods = selectedRange.getJSONObject("periods");
            percentageRate = Double.valueOf(periods.getString(period));
        } catch (JSONException ex) {
            Logger.getLogger(CommonFunctions.class.getName()).log(Level.SEVERE, null, ex);
        }
        return percentageRate;
    }

    public static String getMaturityDate(String proCode) {
        Integer periodInMonths = Integer.parseInt(getPeriod(proCode));
        Calendar c = new GregorianCalendar();

        c.add(Calendar.MONTH, periodInMonths);
        return new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
    }

    private static String getPeriod(String proCode) {
        String period;
        switch (proCode) {
            case "TDTR01":
                period = "1";
                break;
            case "TDTR02":
                period = "2";
                break;
            case "TDTR03":
                period = "3";
                break;
            case "TDTR06":
                period = "6";
                break;
            case "TDTR12":
                period = "12";
                break;
            default:
                period = "1";
                break;
        }
        return period;
    }

    public static boolean getSimilarity(String flexName, String inputName) {
        boolean match = false;
        try {
            int distance = 0;
            if (flexName != null && inputName != null) {
                if (flexName.length() > 0 && inputName.length() > 0) {
                    if (flexName.substring(0, 1).equalsIgnoreCase(inputName.substring(0, 1))) {
                        distance = StringUtils.getLevenshteinDistance(StringUtils.upperCase(flexName), StringUtils.upperCase(inputName));
                        if (distance >= 2) {
                            match = false;
                        } else {
                            match = true;
                        }
                    } else {
                        match = false;
                    }
                }
            }
        } catch (Exception ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
            match = false;
        }
        return match;
    }

    public static boolean isDocumentMatch(Map<String, String> docData, Map<String, String> userInput) {
        Set result = new HashSet();
        Boolean isMatch = false;
        try {
            docData.entrySet().stream().forEach((entry) -> {
                userInput.entrySet().stream().forEach((input) -> {
                    if (getSimilarity(entry.getValue(), input.getValue())) {
                        result.add(entry.getValue());
                    }
                });
            });

            if (result.size() >= 2) {
                isMatch = true;
            }
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        }
        return isMatch;
    }

    public static JSONObject getJSONObject(String data) throws JSONException {
        JSONArray jsonData = new JSONArray(data);
        return jsonData.getJSONObject(0);
    }

    public static boolean isMerchantMerchantPay(HashMap field) {
        boolean isMerchantPay = false;

        if (field.containsKey("100") && field.get("100").equals("MVISA_MERCHANT_PAY") || field.containsKey("100") && field.get("100").equals("MASTERPASS_MERCHANT_PAY")) {
            isMerchantPay = true;
        }
        return isMerchantPay;
    }

    public static String formatDate(String dateToBeFormatted) {
        String formattedDate = dateToBeFormatted;
        try {
            SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            Date date = dt.parse(dateToBeFormatted + " 00:00:00.0");
            formattedDate = new SimpleDateFormat("dd-MMM-yyyy").format(date);
        } catch (ParseException ex) {
            Logger.getLogger(CommonFunctions.class.getName()).log(Level.SEVERE, null, ex);
        }
        return formattedDate;
    }

    public static String getLanguage(String lang, String placeholder) {
        String language = "";
        if (lang.equalsIgnoreCase("en")) {
            switch (placeholder) {
                case "customer_not_activated":
                    language = "Customer not activated. Please activate on the ATM";
                    break;
                case "wrong_nmb_pin":
                    language = "Wrong NMB Mkononi PIN!";
                    break;
                case "account_blocked":
                    language = "Blocked account";
                    break;
                case "maximum_login_exceeded":
                    language = "Maximum login trials exceeded.";
                    break;
                case "use_original_simcard":
                    language = "Please Use Your Original Sim Card.";
                    break;
                case "no_simcard":
                    language = "No Sim Card Detected.";
                    break;
                case "failed_to_save_customer":
                    language = "Failed to save customer";
                    break;
                case "invalid_cust_identifier":
                    language = "Invalid customer identifier";
                    break;
                case "not_whitelisted":
                    language = "You are not whitelisted to use this app";
                    break;
                case "could_not_perform_action":
                    language = "Could not perform action";
                    break;
                case "incorrect_old_pass":
                    language = "Old Password is Incorrect";
                    break;
                case "could_not_update_pass":
                    language = "Could not update password";
                    break;
                case "invalid_doc_number":
                    language = "Invalid document number";
                    break;
                case "invalid_chapchap_customer":
                    language = "Invalid Chapchap-Plus-Customer";
                    break;
                case "invalid_chapchap_number":
                    language = "Invalid chapchap-plus Number";
                    break;
                case "preference_saved_successfully":
                    language = "Your favourites was successfully saved!";
                    break;
                case "preference_exist":
                    language = "Beneficiary already exists";
                    break;
                case "successfully_retrieved":
                    language = "Successfully Retrived";
                    break;
                case "no_beneficiary_found":
                    language = "No beneficiaries found";
                    break;
                case "invalid_request":
                    language = "Invalid request";
                    break;
                case "account_already_linked":
                    language = "Customer account already linked";
                    break;
                case "error_linking_account":
                    language = "Error occured linking account to NMB Mkononi.";
                    break;
                case "account_ownership_mismatch":
                    language = "Account ownership mismatch";
                    break;
                case "preference_deleted":
                    language = "Successfully deleted";
                    break;
                case "preference_not_deleted":
                    language = "Preference could not be deleted";
                    break;
                case "linked_account_removed":
                    language = "Account was successfully unlinked";
                    break;
                case "preference_not_saved":
                    language = "Preference was not successfuly saved";
                    break;
                case "client_not_registered":
                    language = "Client not registered";
                    break;
                case "client_already_registered":
                    language = "Client already Registere";
                    break;
                case "login_information":
                    language = "Login informations saved Sucesssfully! You can now Login";
                    break;
                case "wrong_auth":
                    language = "Wrong authentication Token";
                    break;
                case "error_occured":
                    language = "ERROR Occurred";
                    break;
                case "phone_number_verification_message":
                    language = "Please wait, NMB Mkononi is verifying SMS sent to your phone";
                    break;
                case "mobile_number_exists":
                    language = "The mobile number is registered already";
                    break;
                default:
                    language = "Sorry! Something went wrong";
                    break;
            }
        } else {
            switch (placeholder) {
                case "customer_not_activated":
                    language = "Customer not activated. Please activate on the ATM";
                    break;
                case "wrong_nmb_pin":
                    language = "Wrong NMB Mkononi PIN!";
                    break;
                case "account_blocked":
                    language = "Blocked account";
                    break;
                case "maximum_login_exceeded":
                    language = "Maximum login trials exceeded.";
                    break;
                case "use_original_simcard":
                    language = "Please Use Your Original Sim Card.";
                    break;
                case "no_simcard":
                    language = "No Sim Card Detected.";
                    break;
                case "failed_to_save_customer":
                    language = "Failed to save customer";
                    break;
                case "invalid_cust_identifier":
                    language = "Invalid customer identifier";
                    break;
                case "not_whitelisted":
                    language = "You are not whitelisted to use this app";
                    break;
                case "could_not_perform_action":
                    language = "Could not perform action";
                    break;
                case "incorrect_old_pass":
                    language = "Old Password is Incorrect";
                    break;
                case "could_not_update_pass":
                    language = "Could not update password";
                    break;
                case "invalid_doc_number":
                    language = "Invalid document number";
                    break;
                case "invalid_chapchap_customer":
                    language = "Invalid Chapchap-Plus-Customer";
                    break;
                case "invalid_chapchap_number":
                    language = "Invalid chapchap-plus Number";
                    break;
                case "preference_saved_successfully":
                    language = "Your favourites was successfully saved!";
                    break;
                case "preference_exist":
                    language = "Beneficiary already exists";
                    break;
                case "successfully_retrieved":
                    language = "Successfully Retrived";
                    break;
                case "no_beneficiary_found":
                    language = "No beneficiaries found";
                    break;
                case "invalid_request":
                    language = "Invalid request";
                    break;
                case "account_already_linked":
                    language = "Customer account already linked";
                    break;
                case "error_linking_account":
                    language = "Error occured linking account to NMB Mkononi.";
                    break;
                case "account_ownership_mismatch":
                    language = "Account ownership mismatch";
                    break;
                case "preference_deleted":
                    language = "Successfully deleted";
                    break;
                case "preference_not_deleted":
                    language = "Preference could not be deleted";
                    break;
                case "linked_account_removed":
                    language = "Account was successfully unlinked";
                    break;
                case "preference_not_saved":
                    language = "Preference was not successfully saved";
                    break;
                case "client_not_registered":
                    language = "Client not registered";
                    break;
                case "client_already_registered":
                    language = "Client already Registere";
                    break;
                case "login_information":
                    language = "Login informations saved Sucesssfully! You can now Login";
                    break;
                case "wrong_auth":
                    language = "Wrong authentication Token";
                    break;
                case "error_occured":
                    language = "Sorry! Something went wrong";
                    break;
                case "phone_number_verification_message":
                    language = "Please wait, NMB Mkononi is verifying SMS sent to your phone";
                    break;
                case "mobile_number_exists":
                    language = "The mobile number is registered already";
                    break;
                default:
                    language = "Sorry! Something went wrong";
                    break;
            }
        }
        return language;
    }
}
