# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM golang

RUN apt-get update
RUN apt-get install -y git python jq curl

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# Expose proper port
EXPOSE 3000

# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .
RUN go get ./...

# Build for production.
CMD ["npm","start"]