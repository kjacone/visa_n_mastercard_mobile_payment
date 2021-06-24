/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package main;

import LogEngine.LogEngine;
import com.google.gson.Gson;
import configs.MongoDB;
import helpers.CommonFunctions;
import helpers.SENDTransactionSMS;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Properties;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import processor.ProcessAppRequests;

/**
 *
 * @author kjacone
 */
public class visa_api extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    private LogEngine log;
    HashMap field = new HashMap();
    CommonFunctions cf = new CommonFunctions();

    public static HashMap<String, String> configmap = new HashMap();
    Properties prop = new Properties();
    InputStream input = null;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {

        setAccessControlHeaders(response);
        PrintWriter out = response.getWriter();

        Gson gson = new Gson();

        try {
//            String token = request.getHeader("token");
//            String client = request.getHeader("client_ID");
//            System.out.println("client" + client);
            initialized();
            ProcessAppRequests main = new ProcessAppRequests();

//            String allowedClients = Config.CLIENTS_ALLOWED;
//            if (!allowedClients.contains(client)) {
//                HashMap res = new HashMap();
//                res.put("field39", "57");
//                res.put("field48", "Invalid Client");
//                String invalidClientResponse = cf.EncryptMobileRequest(Config.ENCRYPTION_KEY, Config.ENCRYPTION_VECTOR, gson.toJson(res));
//                out.println(invalidClientResponse);
//                out.close();
//                res.put("ipaddress", request.getRemoteAddr());
//                res.put("client", client);
//                res.put("token", token);
//                log = new LogEngine("InvalidClientResponse", gson.toJson(res));
//                log.log();
//            } else {
            String enc_message = null;
            StringBuilder jb = new StringBuilder();
            String line = null;

            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                jb.append(line);
            }
            reader.close();

            enc_message = jb.toString();

            log = new LogEngine("configMap", configmap.toString());
            log.log();

            String message = enc_message;
//                String message = cf.DecryptMobileRequest(Config.ENCRYPTION_KEY, Config.ENCRYPTION_VECTOR, enc_message);
            log = new LogEngine("MOBILEREQUEST", "Encypted " + enc_message + " \nDecrypted \n" + message);
            log.log();

            MongoDB auditLog = new MongoDB();

            log = new LogEngine("MESSAGE", message);
            log.log();

            HashMap responseBuffer = main.ProcessRequests(message, "token" + "|" + "client");
            String esb_response = gson.toJson(responseBuffer.get("0"));
//                String esb_response = cf.EncryptMobileRequest(Config.ENCRYPTION_KEY, Config.ENCRYPTION_VECTOR, gson.toJson(responseBuffer.get("0")));
//            if (esb_response.equals("\"{}\"")) {
//                esb_response = new JSONObject("{\"f39\":\"99\",\"f48\":\"there was an error contact Admin\"}").toString();
//            }

//            if (responseBuffer.get("webview").equals(true)) {
//                JSONObject js = new JSONObject(esb_response);
//                String destination = "auth3ds.jsp";
//                RequestDispatcher requestDispatcher = request.getRequestDispatcher(destination);
//                request.setAttribute("acsUrl",js.get("acsUrl"));
//                request.setAttribute("TermUrl",js.get("TermUrl"));
//                request.setAttribute("xid",js.get("xid"));
//                request.setAttribute("pareq",js.get("pareq"));
//                requestDispatcher.forward(request, response);
//            }
            
            
            out.println(esb_response);
            out.close();

            if (!responseBuffer.containsKey("isLoggable")) {
                log = new LogEngine("MOBILERESPONSE", gson.toJson(responseBuffer.get("0")));
                log.log();
            }

            //auditing data
            String logId = auditLog.CreateAuditLog(message);//Do this after responding to Requester
            auditLog.UpdateLog(gson.toJson(responseBuffer.get("0")), logId);

            //sending sms if needs be
            if (!responseBuffer.containsKey("ignoresms")) {
                new SENDTransactionSMS(responseBuffer).sendSMS();
            }

//            }
        } catch (IOException ex) {
            StringWriter sw = new StringWriter();
            ex.printStackTrace(new PrintWriter(sw));
            log = new LogEngine(sw.toString());
            log.log();

        } finally {
            out.close();
        }
    }

    protected void processGETRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String ip = request.getRemoteAddr();
            String requestString = "[{request:'GET Not allowed',requestIP:'" + ip + "'}]";
            JSONArray jsonAcDetails = new JSONArray(requestString);
            out.println(jsonAcDetails.get(0).toString());
        } catch (Exception ex) {
            String requestString = "[{'request':'Error in processing','requestIP':'" + request.getRemoteAddr() + "'}]";
            JSONArray jsonAcDetails = new JSONArray(requestString);
            out.println(jsonAcDetails.get(0).toString());
        } finally {
            out.close();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processGETRequest(request, response);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            //Logger.getLogger(NMBMobileBackEnd.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {

            System.out.println("incoming"+ request);
            processRequest(request, response);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            //Logger.getLogger(NMBMobileBackEnd.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    //for Preflight
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setContentType("application/x-www-form-urlencoded");
        response.setHeader("Access-Control-Allow-Headers", "client_ID,token,Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "false");
    }

    public void initialized() {
        try {
            //ServletContext ctx = sce.getServletContext();
            input = new FileInputStream("/Users/kjacone/Documents/ionic_projects/personal/configs/config.properties");
            prop.load(input);
            Enumeration<?> e = prop.propertyNames();
            while (e.hasMoreElements()) {
                String key = (String) e.nextElement();
                String value = prop.getProperty(key);
                configmap.put(key, value);
            }
            configmap.put("LOADCONFIG", "SUCCESS");

        } catch (Exception e) {
            configmap.put("LOADCONFIG", "FAILLED");
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            LogEngine el = new LogEngine(sw.toString());
            el.log();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    StringWriter sw = new StringWriter();
                    e.printStackTrace(new PrintWriter(sw));
                    LogEngine el = new LogEngine(sw.toString());
                    el.log();
                }
            }
        }

    }
}
