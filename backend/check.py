import bcrypt

# Hash of the stored password
stored_hash = b"$2b$12$CWF2EGjCuOTNs3Rrv22R/e9pA7fml8uO5n4GuzyRW9maJpgidIZwi"

# User-provided password for verification
password_attempt = "123456".encode()

# Verify if the entered password matches the stored hash
if bcrypt.checkpw(password_attempt, stored_hash):
    print(f"Password Matched: {password_attempt.decode()}")
else:
    print("Incorrect Password")