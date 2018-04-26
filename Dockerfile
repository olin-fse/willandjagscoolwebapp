# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM golang

RUN apt-get update
RUN apt-get install -y git python jq curl

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# Expose proper port
EXPOSE 3000

# Copy all local files into the image.
COPY . .
RUN npm install
RUN go get github.com/gin-contrib/static
RUN go get github.com/gin-gonic/gin
RUN go get github.com/go-sql-driver/mysql
# RUN go build ./...

# Build for production.
CMD ["npm", "start"]