import supertest from "supertest";
import { expect } from "chai";

const request = supertest("https://petstore.swagger.io/v2/");
const API_KEY = "f2cdfede-2fa9-4fbc-8eb6-9b9d6e462331";
const PET_ID = 998877;
const DOG_NAME = "k-dog";
const NEW_DOG_NAME = "the dog formerly known as k-dog"


describe("UBank Techncial Assessment - Petstore API Testing", () => {

    it("POST /pet: Add a new pet to the petstore", async () => {

        const body = {
            "id": PET_ID,
            "category": {
              "id": 0,
              "name": "string"
            },
            "name": DOG_NAME,
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 0,
                "name": "string"
              }
            ],
            "status": "available"
          };

          return await request.post("pet")
            .set("Authorization", "Bearer "+ API_KEY)
            .send(body)
            .then((response) => {
                console.log(response.body);
                expect(response.statusCode).to.equal(200);
            });
    });

    it("GET /pet{petId}: Verify the pet has been added", () => {
        request.get("pet/" + PET_ID).end((error, response) => {
            console.log(response.body);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.not.be.empty;
            expect(response.body.name).to.equal(DOG_NAME);
        });
    });

    it("PUT /pet: Update the pet name", async () => {

        const body = {
            "id": PET_ID,
            "category": {
              "id": 0,
              "name": "string"
            },
            "name": NEW_DOG_NAME,
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 0,
                "name": "string"
              }
            ],
            "status": "available"
        };

        return await request.put("pet/")
            .set("Authorization", "Bearer "+ API_KEY)
            .send(body)
            .then((response) => {
                console.log(response.body);
                expect(response.statusCode).to.equal(200);
                expect(response.body.name).to.equal(NEW_DOG_NAME);
            });
    });

    it("DELETE /pet/{petId}: Deletes the added pet", async () => {
        await request.delete("pet/" + PET_ID)
            .set("Authorization", "Bearer " + API_KEY)
            .then((response) => {
                console.log(response.body);
                expect(response.statusCode).to.equal(200);
                expect(response.body.message).to.equal(PET_ID.toString());
            });
    });

    it("GET /pet{petId}: Verify the pet has been deleted", async () => {
        // Wait for 5 seconds so the backend has time to process the previous DELETE request
        await setTimeout( function() {
            request.get("pet/" + PET_ID).end((error, response) => {
                console.log(error);
                console.log(response.body);

                // Verify the added pet has been deleted
                expect(response.body.message).to.equal("Pet not found");
            });
        }, 5000);   // 5 second wait
    });

});