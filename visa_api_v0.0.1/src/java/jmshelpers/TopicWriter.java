package jmshelpers;


import LogEngine.LogEngine;
import configs.Config;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Hashtable;
import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicConnectionFactory;
import javax.jms.TopicPublisher;
import javax.jms.TopicSession;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.rmi.PortableRemoteObject;

public class TopicWriter {

    public final static String JNDI_FACTORY = "weblogic.jndi.WLInitialContextFactory";
    public final static String JMS_FACTORY = "EconnectESB_CN_CL";
    private String TOPIC;
    private TopicConnectionFactory tconFactory;
    private TopicConnection tcon;
    private TopicSession tsession;
    private TopicPublisher tpublisher;
    private Topic topic;
    private TextMessage msg;
    private ObjectMessage objmsg;
 private LogEngine ESBLog1;
    private StringWriter sw;
    
    public TopicWriter(String TOPIC) {
        this.TOPIC = TOPIC;
        InitialContext ic = getInitialContext();
        init(ic, TOPIC);
    }

    public void init(Context ctx, String topicName) {
        try {
            tconFactory = (TopicConnectionFactory) PortableRemoteObject.narrow(ctx.lookup(JMS_FACTORY), TopicConnectionFactory.class);
            tcon = tconFactory.createTopicConnection();
            tsession = tcon.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);
            topic = (Topic) PortableRemoteObject.narrow(ctx.lookup(topicName), Topic.class);
            tpublisher = tsession.createPublisher(topic);
            msg = tsession.createTextMessage();
            objmsg = tsession.createObjectMessage();
            tcon.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            tpublisher.close();
            tsession.close();
            tcon.close();
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }

    private InitialContext getInitialContext() {
        InitialContext ic = null;
        try {
            Hashtable<String, String> env = new Hashtable<String, String>();
            env.put(Context.INITIAL_CONTEXT_FACTORY, Config.JNDI_FACTORY);
            env.put(Context.PROVIDER_URL, Config.SMSPROVIDER_URL);
            env.put("weblogic.jndi.createIntermediateContexts", "true");
            ic = new InitialContext(env);
        } catch (Exception e) {
            sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            ESBLog1 = new LogEngine(sw.toString());
            ESBLog1.log();
        }
        return ic;
    }

    public boolean send(String message) {
        boolean sent = false;
        try {
            msg.setText(message);
            //tpublisher.publish(msg);
            tpublisher.publish(msg, DeliveryMode.PERSISTENT, 1, 0);
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

    public boolean sendObject(HashMap message, String biller) {
        boolean sent = false;
        try {
            objmsg.setJMSCorrelationID(message.get("CorrelationID").toString());
            objmsg.setObject(message);
            objmsg.setStringProperty("notificationtype", ((biller != null) ? biller : ""));
            tpublisher.publish(objmsg, DeliveryMode.PERSISTENT, 1, 0);
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
