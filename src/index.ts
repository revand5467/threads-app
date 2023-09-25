import express from 'express'
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
async function init(){
    const app = express()
const PORT = Number(process.env.PORT)||8000;
app.use(express.json());
//create graphql server 
const gqlServer = new ApolloServer({
    typeDefs:`
    type Query{
        hello:String
        say(name:String):String
    }
    `,
    resolvers:{
        Query:{
            hello:()=>`Hello World`,
            say:(_,{name}:{name:string})=>`Hey ${name},How are you?`
        }
    }
})
await gqlServer.start();
app.get('/', (req, res) => {
    res.json({message:'running'})
})
app.use('/graphql', expressMiddleware(gqlServer));
app.listen(PORT, ()=>console.log(`Server started`));
}
init();