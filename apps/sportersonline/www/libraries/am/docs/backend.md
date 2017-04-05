# Deployment

## App

- Each source file name is appended with a version tag (e.g. user.**yyymmddHHmmsshash**.js)
- When a source file is changed, it will be redeployed, with an other version tag.
- The old file will be kept online for some time and removed by a futher deployment, automatically based on time.

## Services
- In the first version there will be just one **.NET core** service with 2 entry points.
    - One for **unauthorised** users
    - One for **authorised** users (can only be called with a valid JToken, containing claims data)



## Azure functions
* Azure functions will be used to:
    * share data between users, by adding change to the user data streams.
    * aggregate monitoring- and reporting data.