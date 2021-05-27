package LogEngine;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Formatter;
import java.util.logging.LogRecord;

public class EsbFormatter extends Formatter {

    @Override
    public String format(LogRecord record) {
//        return record.getThreadID()+"::"+record.getSourceClassName()+"::"
//                +record.getSourceMethodName()+"::"
//                +new Date(record.getMillis())+"::"
//                +record.getMessage()+"\n";
        /////////////////////////////////////////////////////////////////////////////////////// 

        SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yyyy hh:mm:ss.SSS");
        return format.format(new Date()) + "::"
                + record.getMessage() + "\n";
    }

}
