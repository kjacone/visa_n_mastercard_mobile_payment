<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<html>
    <head>
        <title>3ds auth Form</title>
    </head>
    <script type="text/javascript">
        window.onload = formSubmit;
        function formSubmit() {
            document.forms[0].submit();
        }
    </script>
    <body>
        <form method="post" id="PAEnrollForm" name="PAEnrollForm"  target="paInlineFrame"  action="<c:url value="<%= request.getParameter("url").replaceAll("~", "&").replaceAll("_", "=") %>"/>">
            <input type="hidden" name="PaReq" value="<%= request.getParameter("PaReq").replaceAll("~", "&").replaceAll("_", "=") %>"/>
            <input type="hidden" name="TermUrl" value="http://eximious.ngrok.io/payments/webhook"/>
            <input type="hidden" name="MD" value="<%= request.getParameter("xid").replaceAll("~", "&").replaceAll("_", "=") %>"/>
        </form>
            
       

    </body>
</html>