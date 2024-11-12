import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
from os import getenv

load_dotenv()

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587  # Use 465 for SSL
EMAIL_ADDRESS = getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = getenv('EMAIL_PASSWORD')


def send_email(subject, body, to_email, attachment_path=None):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'html'))

    if attachment_path:
        try:
            with open(attachment_path, 'rb') as file:
                attachment = MIMEApplication(file.read(), Name=attachment_path)
                attachment['Content-Disposition'] = f'attachment; filename="{attachment_path}"'
                msg.attach(attachment)
        except Exception as e:
            print(f'Failed to attach file: {e}')
            return 0

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        print('Email sent successfully!')
        return 1
    except Exception as e:
        print(f'An error occurred: {e}')
        return 0
    finally:
        server.quit()
