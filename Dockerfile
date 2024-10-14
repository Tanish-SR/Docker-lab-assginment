# it will download the latest version of node if nothing is give after NODE:
FROM node:18.6

#setting working directory (opritonl)
# All commands will be exectuded in this directory
WORKDIR /app

# COPY . .
# first dot - source - copy all files from cuttrnt location 
# second dot - destination - paste all files

COPY . /app/

# RUN npm install
ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "developement" ]; \
then npm install; \
else npm install --only=production; \
fi

# EXPOSE 3000

ENV PORT 3000
EXPOSE ${PORT}

# runs the container
CMD ["node", "server.js"]
# CMD ["nodemon", "server.js"]
# CMD ["npm", "run", "dev"]