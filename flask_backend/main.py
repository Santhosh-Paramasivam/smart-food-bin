from flask import Flask, request
from flask_restful import Api,Resource
from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)
api = Api(app)

@app.route('/')
def helloWorld() -> str:
    return "hello world"

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/add_food_bank_organization')
def addFoodBankOrganization():
    response = supabase.table("FoodCharityOrganizations").select('*').execute()
    print(response)

class UpdateFoodBinDetails(Resource):
    def post(self):

        data = request.json

        if 'temperature' not in data:
            return {"Bad Request":"Temperature Field Missing In Request Body"},400
        if 'humidity' not in data:
            return {"Bad Request":"Humidity Field Missing in Request Body"},400

        supabase.table("FoodBins").update({'Temperature':data["temperature"], 'Humidity':data["humidity"]}).eq("FoodBinID",1).execute()
        
        return {"Success":"Food Bin Details Updated"},200

api.add_resource(UpdateFoodBinDetails, '/update_food_bin_details')

if __name__ == "__main__":
    app.run(debug=True)
