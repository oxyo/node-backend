##  Node.js - Sqlite simple web-api for Docker Workshop

### Usage
```
docker run -d -p 3000:3000 --name webapi -v /home/oxyo/sqlitedb:/db:Z oxyo/node-backend
```
P.S.  Sqlite tatabase file **skills.db** should be In Host folder `/home/oxyo/sqlitedb/skills.db`

All project files can be downloaded from [https://github.com/oxyo/node-backend](https://github.com/oxyo/node-backend)

#### Web Api usage:
```
http://localhost:3000/skills
http://localhost:3000/addskill/Docker
http://localhost:3000/skill/1
http://localhost:3000/removeskill/Docker
```
#### Usage from shell inside container
```
docker exec -ti webapi bash
node app.js -h

Options:
    -v, --version               output the version number
    -d, --display-skills        Display Skills
    -a, --add-skill [skill]     Add the specified skill
    -r, --remove-skill [skill]  Remove specified skill
    -h, --help                  output usage information

Example:
	node app.js -a Docker
	node app.js -d
	node app.js -r Docker
```
#### Docker file
```
FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]
```


