from flask import Flask, request
from flask_restful import Api,Resource
from dotenv import load_dotenv
import os
from supabase import create_client, Client
import time
import datetime

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
            return {"Bad Request":"Humidity Field Missing In Request Body"},400

        supabase.table("FoodBinReadings").insert({
            'TimeOfMeasurement':datetime.datetime.now().isoformat(), 
            'FoodBinID':1, 
            'FoodWeight':100,
            'Temperature':data["temperature"],
            'Humidity':data["humidity"],
            "FoodSpoiled":True
        }).execute()
        
        return {"Success":"Food Bin Details Updated"},200

class GetFoodBinReadings(Resource):
    def get(self):
        
        foodBinID =  request.args.get('foodbin-id')

        if not foodBinID:
            return {"Bad Request":"foodbin-id not present in request parameter"}

        response = (
                supabase.table("FoodBinReadings")
                .select("*")
                .eq("FoodBinID", int(foodBinID))
                .order('TimeOfMeasurement', desc= True)
                .limit(1)
                .execute()
        )

        return response.data[0],200


api.add_resource(UpdateFoodBinDetails, '/update_food_bin_details')
api.add_resource(GetFoodBinReadings, '/get_food_bin_details')

if __name__ == "__main__":
    app.run(debug=True)
