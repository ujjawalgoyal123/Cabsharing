dbPassword = 'mongodb://rmukati:rmukati@cluster0-shard-00-00.00fsf.mongodb.net:27017,cluster0-shard-00-01.00fsf.mongodb.net:27017,cluster0-shard-00-02.00fsf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13v3ar-shard-0&authSource=admin&retryWrites=true&w=majority';
module.exports = {
    mongoURI: dbPassword
};