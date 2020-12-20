# Serverless Todo backend api using Nestjs and Graphql

### Run in dev mode:
```shell
npm run offline
```

### Deploy to AWS:
```shell
npm run deploy
```

### Env files
* for development use `.env.development` file
* for production use `.env.production` file

### Query Todo by id:
```shell
curl -X POST -H "Content-Type: application/json" --data '{ "query": "query { todo(_id: \"5fdf9f5db6959f271101b0b0\") { label } }" }' http://localhost:3000/dev/graphql
```

### Query Todos. Offset and limit parameters are available:
```shell
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ todos(first:3, offset:1) { _id label } }" }' http://localhost:3000/dev/graphql
```

### Create new todo:
```shell
curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { addTodo(payload: { label: \"yet another todo\", description: \"desc\", status: ALL }) {_id } }" }' http://localhost:3000/dev/graphql
```

### Update todo by id:
```shell
curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { editTodo(_id: \"5fdf9f5db6959f271101b0b0\", payload: { label: \"yet another updated todo\", status: ALL }) { label } }" }' http://localhost:3000/dev/graphql
```

### Remove todo by id:
```shell
curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { removeTodo(_id: \"5fdf9f5db6959f271101b0b0\") { _id } }" }' http://localhost:3000/dev/graphql
```

### Remove all todos:
```shell
curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation { removeAll }" }' http://localhost:3000/dev/graphql
```