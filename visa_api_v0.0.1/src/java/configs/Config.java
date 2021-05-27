/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package configs;

import static main.visa_api.configmap;


/**
 *
 * @author Bernard
 */
public class Config {

    public static String DB_PROVIDER_URL = configmap.get("PROVIDER_URL");
    public static String ESBEndpoint = configmap.get("StrESBWSUrl");
    public static String ESBKYCEndpoint = configmap.get("CUSTDETAILSWS");
    public static String SMSURL = configmap.get("SMSWSURL");
    public static String EMAILURL = configmap.get("SMSWSURL");
    
    
    public static String URL = configmap.get("URL");
    public static String AUTH = configmap.get("AUTH");
    public static String OTP = configmap.get("OTP");
    public static String REGISTER = configmap.get("REGISTER");
    public static String LOGIN = configmap.get("LOGIN");
    public static String GET_CARDS = configmap.get("GET_CARDS");
    public static String GET_TRANSACTIONS = configmap.get("GET_TRANSACTIONS");
    
    
    public static String SMSPROVIDER_URL = configmap.get("SMSWSURL");
    public static String DBJNDINAME = configmap.get("DBJNDINAME");
    public static String JMS_FACTORY = configmap.get("JMS_FACTORY"); //TODO
    public static String JNDI_FACTORY = configmap.get("JNDI_FACTORY"); //TODO

    public static final String PROVIDER_URL = configmap.get("PROVIDER_URL");
    public static String MACHINE1 = configmap.get("MACHINE1");
    public static String MACHINE2 = configmap.get("MACHINE2");
    public static String QUEUEMOB = configmap.get("QUEUEMOB");
    public static String QUEUEPOS = configmap.get("QUEUEPOS");
    public static String DBSOURCE = configmap.get("DBSOURCE");
    public static String PATHTOLOGS = configmap.get("PATHTOLOGS");
    public static String StrESBWSUrl = configmap.get("StrESBWSUrl");
    public static String SMSWSURL = configmap.get("SMSWSURL");
    public static String CUSTDETAILSWS = configmap.get("CUSTDETAILSWS");
    public static String CUSTDETAILSUSER = configmap.get("CUSTDETAILSUSER");
    public static String CUSTDETAILSPASS = configmap.get("CUSTDETAILSPASS");
    public static String CUSTDETAILSSOURCEID = configmap.get("CUSTDETAILSSOURCEID");
    public static String BALCOMMAMOUNT = configmap.get("BALCOMMAMOUNT");
    public static String MSCOMMAMOUNT = configmap.get("MSCOMMAMOUNT");
    public static String BIOFFSETACCOUNT = configmap.get("BIOFFSETACCOUNT");
    public static String DAILYWITHDRAWLIMIT = configmap.get("DAILYWITHDRAWLIMIT");
    public static String ESB_USERNAME = configmap.get("ESB_USERNAME");
    public static String ESB_PASSWORD = configmap.get("ESB_PASSWORD");
    public static String LOGGER_DIR = configmap.get("LOGGER_DIR");
    public static String SELCOMDAILYWITHDRAWLIMIT = configmap.get("SELCOMDAILYWITHDRAWLIMIT");
    public static String SELCOM_BALCOMMAMOUNT = configmap.get("SELCOM_BALCOMMAMOUNT");
    public static String SELCOM_MSCOMMAMOUNT = configmap.get("SELCOM_MSCOMMAMOUNT");
    public static String SELCOM_BIOFFSETACCOUNT = configmap.get("SELCOM_BIOFFSETACCOUNT");
    public static String SMS_SUCCESS = configmap.get("SMS_SUCCESS");
    public static String SMS_BI_SUCCESS = configmap.get("SMS_BI_SUCCESS");
    public static String SMS_FAILED = configmap.get("SMS_FAILED");
    public static String SMS_TANESCO_POSTPAID = configmap.get("SMS_TANESCO_POSTPAID");
    public static String SMS_WATER_PAYMENTS = configmap.get("SMS_WATER_PAYMENTS");
    public static String DAILYFUNDS_TRANSFERLIMIT = configmap.get("DAILYFUNDS_TRANSFERLIMIT");

    public static String AGUT_UPPER_TRANSACTIONLIMIT = configmap.get("AGUT_UPPER_TRANSACTIONLIMIT");
    public static String LOG_DIRECTORY = configmap.get("LOG_DIRECTORY");  //TODO
    public static String AGUT_LOWER_TRANSACTIONLIMIT = configmap.get("AGUT_LOWER_TRANSACTIONLIMIT");
    public static String AGTV_UPPER_TRANSACTIONLIMIT = configmap.get("AGTV_UPPER_TRANSACTIONLIMIT");
    public static String AGTV_LOWER_TRANSACTIONLIMIT = configmap.get("AGTV_LOWER_TRANSACTIONLIMIT");
    public static String AGLU_UPPER_TRANSACTIONLIMIT = configmap.get("AGLU_UPPER_TRANSACTIONLIMIT");
    public static String AGLU_LOWER_TRANSACTIONLIMIT = configmap.get("AGLU_LOWER_TRANSACTIONLIMIT");
    public static String AGGO_UPPER_TRANSACTIONLIMIT = configmap.get("AGGO_UPPER_TRANSACTIONLIMIT");
    public static String AGGO_LOWER_TRANSACTIONLIMIT = configmap.get("AGGO_LOWER_TRANSACTIONLIMIT");
    public static String AGTA_UPPER_TRANSACTIONLIMIT = configmap.get("AGTA_UPPER_TRANSACTIONLIMIT");
    public static String AGTA_LOWER_TRANSACTIONLIMIT = configmap.get("AGTA_LOWER_TRANSACTIONLIMIT");
    public static String AGAH_UPPER_TRANSACTIONLIMIT = configmap.get("AGAH_UPPER_TRANSACTIONLIMIT");
    public static String AGAH_LOWER_TRANSACTIONLIMIT = configmap.get("AGAH_LOWER_TRANSACTIONLIMIT");
    public static String AGCO_UPPER_TRANSACTIONLIMIT = configmap.get("AGCO_UPPER_TRANSACTIONLIMIT");
    public static String AGCO_LOWER_TRANSACTIONLIMIT = configmap.get("AGCO_LOWER_TRANSACTIONLIMIT");
    public static String AGCC_UPPER_TRANSACTIONLIMIT = configmap.get("AGCC_UPPER_TRANSACTIONLIMIT");
    public static String AGCC_LOWER_TRANSACTIONLIMIT = configmap.get("AGCC_LOWER_TRANSACTIONLIMIT");
    public static String FT_UPPER_TRANSACTIONLIMIT = configmap.get("FT_UPPER_TRANSACTIONLIMIT");
    public static String FT_LOWER_TRANSACTIONLIMIT = configmap.get("FT_LOWER_TRANSACTIONLIMIT");
    public static String DEPOSIT_LOWER_TRANSACTIONLIMIT = configmap.get("DEPOSIT_LOWER_TRANSACTIONLIMIT");
    public static String DEPOSIT_UPPER_TRANSACTIONLIMIT = configmap.get("DEPOSIT_UPPER_TRANSACTIONLIMIT");
    public static String WITHDRAWAL_LOWER_TRANSACTIONLIMIT = configmap.get("WITHDRAWAL_LOWER_TRANSACTIONLIMIT");
    public static String WITHDRAWAL_UPPER_TRANSACTIONLIMIT = configmap.get("WITHDRAWAL_UPPER_TRANSACTIONLIMIT");
    public static String AGD3_LOWER_TRANSACTIONLIMIT = configmap.get("AGD3_LOWER_TRANSACTIONLIMIT");
    public static String AGD3_UPPER_TRANSACTIONLIMIT = configmap.get("AGD3_UPPER_TRANSACTIONLIMIT");

    public static String CLIENTS_ALLOWED = configmap.get("CLIENTS_ALLOWED");
    public static String ESBWS = configmap.get("ESBWS");
    public static String MOBILEESBAPPUser = configmap.get("MOBILEESBAPPUser");
    public static String MOBILEESBPassword = configmap.get("MOBILEESBPassword");
    public static String ENCRYPTION_VECTOR = configmap.get("ENCRYPTION_VECTOR");
    public static String ENCRYPTION_KEY = configmap.get("ENCRYPTION_KEY");
    public static String HASHSTRING = configmap.get("HASHSTRING");
    public static String HASHSTRING_PILOT = configmap.get("HASHSTRING_PILOT");
    public static String ANDROID_VERSION_PILOT = configmap.get("ANDROID_VERSION_PILOT");
    public static String IOS_VERSION_PILOT = configmap.get("IOS_VERSION_PILOT");

}
