import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect("expenses.db")
conn.row_factory = sqlite3.Row  # Enables accessing columns by name
cursor = conn.cursor()

# Fetch and display expenses
cursor.execute("SELECT * FROM expenses")
expenses = cursor.fetchall()

print("Expenses:")
if expenses:
    print([column[0] for column in cursor.description])  # Print column names
    for row in expenses:
        print(dict(row))  # Print each row as a dictionary
else:
    print("No expenses found.")

# Fetch and display users
cursor.execute("SELECT * FROM users")
users = cursor.fetchall()

print("\nUsers:")
if users:
    print([column[0] for column in cursor.description])  # Print column names
    for row in users:
        print(dict(row))  # Print each row as a dictionary
else:
    print("No users found.")

# Close the database connection
conn.close()

