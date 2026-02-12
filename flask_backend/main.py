from flask import Flask, request
from flask_restful import Api, Resource
from dotenv import load_dotenv
import os
from supabase import create_client, Client
import datetime
from flask_cors import CORS

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)
api = Api(app)

# cors = CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def helloWorld() -> str:
    return "hello world"


@app.route('/favicon.ico')
def favicon():
    return '', 204


def returnIfPresent(data: dict, key: str) -> str:
    if key in data:
        return data[key]
    else:
        return ""


class UpdateFoodBinDetails(Resource):
    def post(self):

        data = request.json

        if 'temperature' not in data:
            return {"Bad Request": "Temperature Field Missing In Request Body"}, 400
        if 'humidity' not in data:
            return {"Bad Request": "Humidity Field Missing In Request Body"}, 400
        if 'weight' not in data:
            return {"Bad Request": "Weight Field Missing In Request Body"}, 400
        if 'foodbinid' not in data:
            return {"Bad Request": "FoodBinID Field Missing In Request Body"}, 400

        supabase.table("FoodBinReadings").insert({
            'TimeOfMeasurement': datetime.datetime.now().isoformat(),
            'FoodBinID': data["foodbinid"],
            'FoodWeight': data["weight"],
            'Temperature': data["temperature"],
            'Humidity': data["humidity"],
            "FoodSpoiled": True
        }).execute()

        return {"Success": "Food Bin Details Updated"}, 200


class GetFoodBinReadings(Resource):
    def get(self):

        foodBinID = request.args.get('foodbin-id')

        if not foodBinID:
            return {"Bad Request": "foodbin-id not present in request parameter"}, 400

        response = (
            supabase.table("FoodBinReadings")
            .select("*")
            .eq("FoodBinID", int(foodBinID))
            .order('TimeOfMeasurement', desc=True)
            .limit(1)
            .execute()
        )

        return response.data, 200


class PlaceDonation(Resource):
    def post(self):

        foodBinId = request.args.get('foodbin-id')

        data = request.json['formData']

        print(data)

        if 'donorName' not in data:
            return {"Bad Request": "'donorName' Is A Mandatory Field"}, 400
        if 'phoneNumber' not in data:
            return {"Bad Request": "'phoneNumber' Is A Mandatory Field"}, 400
        if 'foodType' not in data:
            return {"Bad Request": "'foodType' Is A Mandatory Field"}, 400
        if 'donationType' not in data:
            return {"Bad Request": "'donationType' Is A Mandatory Field"}, 400
        if 'donatedItemName' not in data:
            return {"Bad Request": "'donatedItemName' Is A Mandatory Field"}, 400
        if 'description' not in data:
            return {"Bad Request": "'description' Is A Mandatory Field"}, 400
        if 'timeOfPreparation' not in data:
            return {"Bad Request": "'timeOfPreparation' Is A Mandatory Field"}, 400
        if 'timeOfExpiry' not in data:
            return {"Bad Request": "'timeOfExpiry' Is A Mandatory Field"}, 400

        DonorByPhoneNumber = supabase.table("Donor").select(
            "*").eq('PhoneNumber', data['phoneNumber']).execute()

        if len(DonorByPhoneNumber.data) == 0:
            print("Donor record not found, creating from scratch")

            response = (
                supabase.table("Donor").insert({
                    "Name": data['donorName'],
                    "EmailID": returnIfPresent(data, "emailId"),
                    "PhoneNumber": data['phoneNumber']
                }).execute()
            )

            DonorID = response.data[0]['DonorID']

        else:
            print("Donor record found, no updates")

            response = (supabase.table("Donor").select('DonorID').eq(
                'PhoneNumber', data['phoneNumber']).execute())

            DonorID = response.data[0]['DonorID']

        response = (
            supabase.table("Donations").insert({
                "DonorID": DonorID,
                "FoodType": data['foodType'],
                "DonationType": data['donationType'],
                "DonatedItemName": data['donatedItemName'],
                "Description": data['description'],
                "EstimatedPreparationTimestamp": data['timeOfPreparation'],
                "EstimatedExpiryTimestamp": data['timeOfExpiry'],
                "PickedUp": False,
                "FoodBinID": foodBinId
            }).execute()
        )

        return {"Success": "Donation Placed"}, 200

class GetFoodBins(Resource):
    def get(self):

        response = supabase.table("FoodBins").select('*').execute()
        return response.data,200

class GetDonations(Resource):
    def get(self):

        foodBinID = request.args.get('foodbin-id')

        if not foodBinID:
            return {"Bad Request": "foodbin-id not present in request parameter"}, 400

        response = supabase.table("Donations").select('*').eq('FoodBinID',foodBinID).eq('PickedUp',False).execute()
        return response.data,200
    
class PickUpDonation(Resource):
    def put(self):

        data = request.json

        if 'DonationID' not in data:
            return {"Bad Request":"'DonationID' Is A Mandatory Field"},400
        
        response = supabase.table("Donations").update({'PickedUp': True}).eq('DonationID', data['DonationID']).execute()

        return {"Success":"Item successfully picked up"}, 200
        

api.add_resource(GetFoodBins,'/getfoodbins')
api.add_resource(UpdateFoodBinDetails, '/update_food_bin_details')
api.add_resource(GetFoodBinReadings, '/get_food_bin_details')
api.add_resource(PlaceDonation, '/place_donation')
api.add_resource(GetDonations, '/get_donations')
api.add_resource(PickUpDonation, '/pick_up_donation')

if __name__ == "__main__":
    app.run(debug=True)
