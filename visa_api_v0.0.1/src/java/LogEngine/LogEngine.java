/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogEngine;

import configs.Config;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SocketHandler;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import jmshelpers.QueueWriter;

/**
 *
 * @author kjacone
 */
public class LogEngine {

    private FileHandler fh = null;
    private String pathtologs = Config.PATHTOLOGS;;
    private SocketHandler sh = null;
    //for socket handler
    private String directory = Config.LOG_DIRECTORY;;

    private String filename = null;
    private String msg = null;
    private Logger logger = null;
    public HashMap<String, String> logmap;

    public LogEngine(String filename, String msg) {
        this.filename = filename;
        this.msg = msg;
//        this.msg = (maskCardNumber(msg)).replaceAll("(?<!\\d)\\d{4,5}(?!\\d)", "XXXX");
    }

    public static String maskCardNumber(String text) {
        String carNoRegex = "(\\d{16})";
        Pattern pattern = Pattern.compile(carNoRegex);
        Matcher matcher = pattern.matcher(text);

        // Check all occurrences
        while (matcher.find()) {
            //System.out.print("Start index: " + matcher.start());
            //System.out.print(" End index: " + matcher.end());

            String cardno = matcher.group();
            //System.out.println("Card number Found: " + cardno);

            String maskRegex = "(\\d{6})(\\d{6})(\\d{4})";
            String maskedCardNo = cardno.replaceAll(maskRegex, "$1XXXXXXXX$3");
//            text = text.replace(cardno, maskedCardNo);
            
            
        }

        return text;
    }
    public LogEngine(String filename, HashMap map) {
        this.filename = filename;
        logmap = new HashMap(map);
        if (logmap.containsKey("RawMessage")) {
            logmap.put("RawMessage", "");
        }
        this.msg = logmap.toString();
    }

    public LogEngine(String msg) {
        this.filename = "exceptions";
        this.msg = msg;
    }

    

    public void log() {
          System.out.println("REMOVE LOG:\n"+msg  );
        logger = Logger.getLogger("");
        SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yyyy");
        String daylog = format.format(new Date());
      
        try {
            fh = new FileHandler(createDailyDirectory() + filename + "%g.txt", 26000000, 20, true);
            fh.setFormatter(new EsbFormatter());
            logger.addHandler(fh);
            logger.setLevel(Level.FINE);
            logger.fine(msg);
            fh.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void log2() {
        logger = Logger.getLogger(filename);
        String finalmessage = "###" + directory + "$$$" + filename + "###" + msg;
        try {
            sh = new SocketHandler("192.168.114.211", 5050);
            sh.setFormatter(new EsbFormatter());
            logger.addHandler(sh);
            logger.setLevel(Level.FINE);
            logger.fine(finalmessage);
            sh.flush();
            sh.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
//Add to Queue for Logs
 public void logtoQueue() {
    SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss.SSS");
    String timestamp = format.format(new Date());
    String finalmessage = "###" + this.directory + "$$$" + this.filename + "###" + timestamp + "::" + this.msg;
    QueueWriter qw = new QueueWriter("jms/CCPLog_Queue_DS");
    qw.send(finalmessage, "");
  }

    public String createDailyDirectory() {
        String Dailydirectory = "";
        SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yyyy");
        String daylog = format.format(new Date());
        Dailydirectory = pathtologs + daylog;
        new File(Dailydirectory).mkdir();
        return Dailydirectory + "/";
    }

}
