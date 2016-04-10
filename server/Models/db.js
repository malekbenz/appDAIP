var mongoose = require('mongoose'),
    dbURI = 'mongodb://localhost/awem';

mongoose.connect(dbURI);
//  -------------------------------------
var detailBordereauSchema = new mongoose.Schema({
        demandeur: String,
        sex : String,
        employeur : String,
        secteurJuridique:String,
        programme:String, // CID, CIP ..
        niveau :String, // sup1, Sup2 ..
        codeAgence: String,
        codeDiplome : String,
        CCP:String


});
var bordereauSchema = new mongoose.Schema({

        numero: {type: Number},
        destinatair: String,
        dateEnvoi: { type: Date, default: Date.now },
        createdOn: { type: Date, default: Date.now },
        detailBordereaux:[detailBordereauSchema],
        modifiedOn: Date,
        isCloture:Boolean 
});

// Build the User model
mongoose.model( 'Bordereau', bordereauSchema );

//   -----------------------
mongoose.connection.on('connected', function () {
      console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
      console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
      console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
