/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jmshelpers;

//import Database.Config;
import LogEngine.LogEngine;
import configs.Config;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Hashtable;
import javax.jms.JMSException;
import javax.jms.MapMessage;
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSender;
import javax.jms.QueueSession;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/**
 *
 * @author user1
 */
public class QueueWriter {

    private final String JNDI_FACTORY = "weblogic.jndi.WLInitialContextFactory";
    // Defines the JMS context factory.
    public final static String JMS_FACTORY = "jms/AgencyConnectionFactory";
    // Defines the queue.
    private String QUEUE;
    private QueueConnectionFactory qconFactory;
    private QueueConnection qcon;
    private QueueSession qsession;
    private QueueSender qsender;
    private Queue queue;
    private TextMessage msg;
    private ObjectMessage objmsg;
    private MapMessage mapmsg;
    private Hashtable env;
    private LogEngine ESBLog1;
    private StringWriter sw;

    public QueueWriter() {

    }

    public QueueWriter(String QUEUE) {
        this.QUEUE = QUEUE;
        InitialContext ic = getInitialContext();
        init(ic, QUEUE);
    }

    public void init(Context ctx, String queueName) {
        try {
            qconFactory = (QueueConnectionFactory) ctx.lookup(Config.JMS_FACTORY);
            qcon = qconFactory.createQueueConnection();
            qsession = qcon.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
            queue = (Queue) ctx.lookup(queueName);
            qsender = qsession.createSender(queue);
            msg = qsession.createTextMessage();
            objmsg = qsession.createObjectMessage();
            mapmsg = qsession.createMapMessage();
            qcon.start();
        } catch (JMSException | NamingException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
    }

    private InitialContext getInitialContext() {
        env = new Hashtable();
        InitialContext ic = null;
        try {
            env.put(Context.INITIAL_CONTEXT_FACTORY, Config.JNDI_FACTORY);
            env.put(Context.PROVIDER_URL, Config.PROVIDER_URL);
            ic = new InitialContext(env);
        } catch (NamingException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
        return ic;
    }

    public void close() {
        try {
            qsender.close();
            qsession.close();
            qcon.close();
        } catch (JMSException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
    }

    public boolean send(String message, String CorrelationID) {
        boolean sent = false;
        try {
            msg.setText(message);
            qsender.send(msg);
            sent = true;
        } catch (JMSException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
        close();
        return sent;
    }

    public boolean sendObject(HashMap message, String CorrelationID) {
        boolean sent = false;
        try {
            objmsg.setJMSCorrelationID(CorrelationID);
            objmsg.setObject(message);
            qsender.send(objmsg);
            sent = true;
        } catch (JMSException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
        close();
        return sent;
    }

    public boolean sendObject_selector(HashMap message, String CorrelationID, String biller) {
        boolean sent = false;
        try {
            objmsg.setJMSCorrelationID(CorrelationID);
            objmsg.setObject(message);
            objmsg.setStringProperty("biller", ((biller != null) ? biller : ""));
            qsender.send(objmsg);
            sent = true;
        } catch (JMSException e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
        close();
        return sent;
    }
}
