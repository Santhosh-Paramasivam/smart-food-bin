from flask import Flask
from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)


@app.route('/')
def helloWorld() -> str:
    return "hello world"


@app.route('/add_food_bank_organization')
def addFoodBankOrganization():
    response = supabase.table("FoodCharityOrganizations").select('*').execute()
    print(response)


if __name__ == "__main__":
    app.run()
