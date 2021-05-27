
import helpers.JWebToken;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.*;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.json.JSONException;

import static org.junit.Assert.fail;

/**
 * @author user
 */
public class JWebTokenTest {

    LocalDateTime ldt;
    JSONObject payload;

    public JWebTokenTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() throws JSONException {
        ldt = LocalDateTime.now().plusDays(90);
        payload = new JSONObject("{\"sub\":\"1234\",\"aud\":[\"admin\"],"
                + "\"exp\":" + ldt.toEpochSecond(ZoneOffset.UTC) + "}");
    }

    @After
    public void tearDown() {
    }

    /**
     * Test of HMACSHA256 method, of class JWebToken.
     */
    @org.junit.Test
    public void testWithData() throws JSONException {
        //generate JWT
        long exp = LocalDateTime.now().plusDays(90).toEpochSecond(ZoneOffset.UTC);
        String token = new JWebToken("1234", new JSONArray("['admin']"), exp).toString();
        //verify and use
        JWebToken incomingToken;
        System.out.println(token);
        try {
            incomingToken = new JWebToken(token);
            if (incomingToken.isValid()) {
                Assert.assertEquals("1234", incomingToken.getSubject());
                Assert.assertEquals("admin", incomingToken.getAudience().get(0));
            }
        } catch (NoSuchAlgorithmException ex) {
            fail("Invalid Token" + ex.getMessage());
        }

    }

    @org.junit.Test
    public void testWithJson() throws JSONException {

        String token = new JWebToken(payload).toString();
        //verify and use
        JWebToken incomingToken;
        try {
            incomingToken = new JWebToken(token);
            if (incomingToken.isValid()) {
                Assert.assertEquals("1234", incomingToken.getSubject());
                Assert.assertEquals("admin", incomingToken.getAudience().get(0));
            }
        } catch (NoSuchAlgorithmException ex) {
            fail("Invalid Token" + ex.getMessage());
        }
    }

    @org.junit.Test(expected = IllegalArgumentException.class)
    public void testBadHeaderFormat() throws JSONException {

        String token = new JWebToken(payload).toString();
        token = token.replaceAll("\\.", "X");
        //verify and use
        JWebToken incomingToken;
        try {
            incomingToken = new JWebToken(token);
            if (incomingToken.isValid()) {
                Assert.assertEquals("1234", incomingToken.getSubject());
                Assert.assertEquals("admin", incomingToken.getAudience().get(0));
            }
        } catch (NoSuchAlgorithmException ex) {
            fail("Invalid Token" + ex.getMessage());
        }
    }

    @org.junit.Test(expected = NoSuchAlgorithmException.class)
    public void testIncorrectHeader() throws NoSuchAlgorithmException, JSONException {

        String token = new JWebToken(payload).toString();
        token = token.replaceAll("[^.]", "X");
        //verify and use
        JWebToken incomingToken;

        incomingToken = new JWebToken(token);
        if (incomingToken.isValid()) {
            Assert.assertEquals("1234", incomingToken.getSubject());
            Assert.assertEquals("admin", incomingToken.getAudience().get(0));
        }
    }
}