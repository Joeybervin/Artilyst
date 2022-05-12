var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://joey:mdpjoey@cluster.0tz9c.mongodb.net/Artilyst?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.log(`error, failed to connect to the database because --> ${err}`);
        } else {
            console.info('*** Database connection : Success ***');
        }
    }
)
