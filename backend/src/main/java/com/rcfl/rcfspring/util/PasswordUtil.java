<<<<<<< HEAD
package com.rcfl.rcfspring.util;

import java.security.SecureRandom;

public class PasswordUtil {

    private static final String CHARS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
    private static final int LENGTH = 10;

    private static final SecureRandom random = new SecureRandom();

    public static String generateTempPassword() {
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < LENGTH; i++) {
            password.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return password.toString();
    }
}
=======
package com.rcfl.rcfspring.util;

import java.security.SecureRandom;

public class PasswordUtil {

    private static final String CHARS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
    private static final int LENGTH = 10;

    private static final SecureRandom random = new SecureRandom();

    public static String generateTempPassword() {
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < LENGTH; i++) {
            password.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return password.toString();
    }
}
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
