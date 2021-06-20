
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class EmailManager:
    def __init__(self, env):
        self.sender_email = env['EMAIL_USERNAME']
        self.sender_password = env['EMAIL_PASSWORD']

    def send_email(self, receiver, subject, html):
        message = MIMEMultipart("alternative")

        message["Subject"] = subject
        message["From"] = self.sender_email
        message["To"] = receiver
        message.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(self.sender_email, self.sender_password)
            server.ehlo()
            server.sendmail(
                self.sender_email, receiver, message.as_string()
            )
