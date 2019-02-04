# ryanisnan/sudoku_fe

This app is a node.js frontend application that provides a UI for completing games of Sudoku. It is a dummy project proving interaction between microservices over a REST API.

# Running the app locally
```
git clone git@github.com:ryanisnan/sudoku_fe
cd sudoku_fe/src
docker-compose up --build
```

You will also need to have a version of [https://github.com/ryanisnan/sudoku_be](https://github.com/ryanisnan/sudoku_be) running locally for this application to work.

# Accessing the app
`curl localhost:8010`

# About this app
This app is a node app using React. Currently it is set to use a back-end container accessible at `localhost`, though this should be abstracted to come through environment variables.

Additionally, there is no authentication in the system yet, though something like signed JWTs would do the trick.

The UI looks like this:

![](react_fe.png?raw=true)
