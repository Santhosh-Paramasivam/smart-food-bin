CREATE TABLE "FoodBins"(
    "FoodBinID" BIGSERIAL PRIMARY KEY,
    "Nickname" VARCHAR(50) NOT NULL,
    "MACAddress" VARCHAR(17) NOT NULL
);

CREATE TABLE "FoodBinReadings"(
    "FoodBinReadingID" BIGSERIAL PRIMARY KEY,
    "TimeOfMeasurement" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "FoodBinID" BIGINT NOT NULL,
    "FoodWeight" FLOAT(53) NOT NULL,
    "Temperature" FLOAT(53) NOT NULL,
    "Humidity" FLOAT(53) NOT NULL,
    "FoodSpoiled" BOOLEAN NOT NULL,
    FOREIGN KEY ("FoodBinID") REFERENCES "FoodBins"("FoodBinID") ON DELETE CASCADE
);

CREATE TABLE "Donations"(
    "DonationID" BIGSERIAL PRIMARY KEY,
    "DonorID" BIGINT NOT NULL,
    "FoodType" VARCHAR(6) CHECK
        ("FoodType" IN('solid', 'liquid')) NOT NULL,
    "DonationType" VARCHAR(14)
    CHECK
        (
            "DonationType" IN(
                'Perishable',
                'Non-perishable',
                'Cooked Meals',
                'Canned Goods'
            )
        ) NOT NULL,
    "DonatedItemName" VARCHAR(50) NOT NULL,
    "Description" TEXT NOT NULL,
    "EstimatedPreparationTimestamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "EstimatedExpiryTimestamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "FoodBinID" BIGINT NOT NULL,
    FOREIGN KEY ("FoodBinID") REFERENCES "FoodBins"("FoodBinID") ON DELETE CASCADE,
    FOREIGN KEY("DonorID") REFERENCES "Donor"("DonorID") ON DELETE CASCADE
);

CREATE TABLE "Donor"(
    "DonorID" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(50) NOT NULL,
    "EmailID" VARCHAR(50) NULL,
    "PhoneNumber" VARCHAR(10) NULL
);
