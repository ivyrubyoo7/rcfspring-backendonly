
package com.rcfl.rcfspring.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendUserWelcomeEmail(
            String toEmail,
            String tempPassword
    ) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your Account Has Been Created");
        message.setText(
                "Hello,\n\n" +
                        "Your account has been created by the administrator.\n\n" +
                        "Temporary Password: " + tempPassword + "\n\n" +
                        "Please log in and change your password on first login.\n\n" +
                        "Regards,\n" +
                        "Admin Team"
        );

        mailSender.send(message);
    }
}

package com.rcfl.rcfspring.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendUserWelcomeEmail(
            String toEmail,
            String tempPassword
    ) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your Account Has Been Created");
        message.setText(
                "Hello,\n\n" +
                        "Your account has been created by the administrator.\n\n" +
                        "Temporary Password: " + tempPassword + "\n\n" +
                        "Please log in and change your password on first login.\n\n" +
                        "Regards,\n" +
                        "Admin Team"
        );

        mailSender.send(message);
    }
}
