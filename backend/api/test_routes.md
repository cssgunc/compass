# Synopsis
Collection of sample curl requests for api routes.

# Resources
## Get All
Given an admin UUID, gets all of the resources from ResourceEntity.
```
curl -X 'GET' \
  'http://127.0.0.1:8000/api/resource?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json'
```

## Get by Name
Given the name of a resource and an admin UUID, gets a resource from ResourceEntity by name.
```
curl -X 'GET' \
  'http://127.0.0.1:8000/api/resource/Financial%20Empowerment%20Center?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json'
```

## Create 
Given an admin UUID and a new resource object, adds a resource to ResourceEntity.
```
curl -X 'POST' \
  'http://127.0.0.1:8000/api/resource?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 25,
  "name": "algorithms and analysis textbook",
  "summary": "textbook written by kevin sun for c550",
  "link": "kevinsun.org",
  "program": "DOMESTIC",
  "created_at": "2024-11-04T20:07:31.875166"
}'
```

## Update
Given an admin UUID and a modified resource object, updates the resource with a matching ID if it exists.
```
curl -X 'PUT' \
  'http://127.0.0.1:8000/api/resource?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 25,
  "name": "algorithms and analysis textbook",
  "summary": "textbook written by the goat himself, kevin sun, for c550",
  "link": "kevinsun.org",
  "program": "DOMESTIC",
  "created_at": "2024-11-04T20:07:31.875166"
}'
```

## Delete
Given an admin UUID and a resource object, deletes the resource with a matching ID if it exists.
```
curl -X 'DELETE' \
  'http://127.0.0.1:8000/api/resource?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 25,
  "name": "algorithms and analysis textbook",
  "summary": "textbook written by the goat himself, kevin sun, for c550",
  "link": "kevinsun.org",
  "program": "DOMESTIC",
  "created_at": "2024-11-04T20:07:31.875166"
}'
```

# Services
## Get All
Given an admin UUID, gets all of the services from ServiceEntity.
```
curl -X 'GET' \
  'http://127.0.0.1:8000/api/service?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json'
```

## Get by Name
Given the name of a service and an admin UUID, gets a service from ServiceEntity by name.
```
curl -X 'GET' \
  'http://127.0.0.1:8000/api/service/Shelter%20Placement?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json'
```

## Create 
Given an admin UUID and a new service object, adds a service to ServiceEntity.
```
curl -X 'POST' \
  'http://127.0.0.1:8000/api/service?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 25,
  "created_at": "2024-11-04T20:07:31.890412",
  "name": "c550 tutoring",
  "status": "open",
  "summary": "tutoring for kevin sun'\''s c550 class",
  "requirements": [
    "must be in c550"
  ],
  "program": "COMMUNITY"
}'
```

## Update
Given an admin UUID and a modified service object, updates the service with a matching ID if it exists.
```
curl -X 'PUT' \
  'http://127.0.0.1:8000/api/service?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 25,
  "created_at": "2024-11-04T20:07:31.890412",
  "name": "c550 tutoring",
  "status": "closed",
  "summary": "tutoring for kevin sun'\''s c550 class",
  "requirements": [
    "must be in c550"
  ],
  "program": "COMMUNITY"
}'
```

## Delete
Given an admin UUID and a service object, deletes the service with a matching ID if it exists.
```
curl -X 'DELETE' \
  'http://127.0.0.1:8000/api/service?uuid=acc6e112-d296-4739-a80c-b89b2933e50b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 25,
  "created_at": "2024-11-04T20:07:31.890412",
  "name": "c550 tutoring",
  "status": "closed",
  "summary": "tutoring for kevin sun'\''s c550 class",
  "requirements": [
    "must be in c550"
  ],
  "program": "COMMUNITY"
}'
```