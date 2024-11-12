import secrets


def generate_meeting_id():
    return secrets.token_urlsafe(6)

def generate_passcode():
    return secrets.randbelow(1000000)


id = generate_meeting_id()
passcode = generate_passcode()
