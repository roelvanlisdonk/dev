

# Create certificates: http://stackoverflow.com/questions/12871565/how-to-create-pem-files-for-https-web-server
cd C:\Temp


# For production
openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem


# Self signed for dev
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem


# Dev certificate:
# Country name: NL
# Province name: Noord Brabant
# City: Roosendaal
# Organization Name: AM
# Unit name: .
# Common Name: stub.service.am.dev
# Email address: roelvanlisdonk@live.com
# Optional company name: AM