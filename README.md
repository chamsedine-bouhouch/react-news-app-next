# News Agregator App

## Installation guide 

1. Build a Docker Image

`docker build -t react-news-app:developement ./`

2. Run Docker Image

`docker run --publish 3000:3000 docker_nextjs:developement`

# Get container ID
docker ps

# Print app output
docker logs <container id>

# go inside the container
docker exec -it <container id> /bin/sh
