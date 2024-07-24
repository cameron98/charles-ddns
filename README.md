# Charles's Cloudflare DDNS Script

### Required environment variables to run:

EMAIL\
API_KEY\
ZONE_ID\
FQDN

### Example docker command to build:

    docker build -t charles-ddns .

### Example docker command to run:

    docker run -e EMAIL=email@email.com -e API_KEY=aeasf34254sdfefs324132 -e ZONE_ID=adfsefew12345566423sdfsef -e FQDN=vpn.mydomain.com charles-ddns

### Setup in portainer

1. Open portainer and go to 'images', then click 'Build a new image'.
2. Name the image and click 'URL' from the list of options.
3. Specify the URL as https://github.com/cameron98/charles-ddns.git#main and leave the Dockerfile path as 'Dockerfile'
4. Click 'Build the image'. If the build fails, check git is installed on the portainer host and try again.
5. Click 'containers' from the left hand menu and select 'Add container'.
6. Name the container, then in the 'Image' field, enter the same name you gave the image when creating it. Untick the 'Always pull image' option.
7. Scroll down to the 'Env' section and add the required variables, then click 'Deploy the container'
