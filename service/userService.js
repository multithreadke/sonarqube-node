const User = require('../models/user');
var winston = require('../config/winston');
var uuid = require('uuid');
var splunk = require('../config/splunk');

// Create and Save a new User
exports.create = (req, res, next) => {
    // Validate request
    if (!req.body.firstName || !req.body.lastName) {
        winston.log("error", "User content can not be empty", {
          TimeStamp: Date.now(),
          TransactionID: uuid.v1(),
          TransactionType: "CreateUser",
          Action: "Create new User",
          Response: "Failed",
          ResponseTime: res.get("X-Response-Time"),
          ResponseCode: "400",
          SourceSystem: req.url,
          TargetSystem: "STKPUSH",
          ErrorDescription: "User content can not be empty",
          Extradata1: "",
          Extradata2: ""
        });

        var payload = {
          message: {
            TimeStamp: Date.now(),
            Level: "error",
            TransactionID: uuid.v1(),
            TransactionType: "CreateUser",
            Action: "Create new User",
            Response: "Failed",
            ResponseTime: res.get("X-Response-Time"),
            ResponseCode: "400",
            SourceSystem: req.url,
            TargetSystem: "STKPUSH",
            ErrorDescription: "User content can not be empty",
            Extradata1: "",
            Extradata2: ""
          }
        };
        splunk.send(payload, function(err, resp, body) {
          // If successful, body will be { text: 'Success', code: 0 }
          console.log("Response from Splunk", body);
        });
        return res.status(400).send({message: "User content can not be empty"});
    }

    // Create a User
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // Save user in the database
    user.save()
        .then(data => {
             winston.log("info", "User was created successfully", {
                 TimeStamp: Date.now(),
                 TransactionID: uuid.v1(),
                 TransactionType: "CreateUser",
                 Action: "Create new User",
                 Response: "Success",
                 ResponseTime: res.get('X-Response-Time'),
                 ResponseCode: "201",
                 SourceSystem: req.url,
                 TargetSystem: "STKPUSH",
                 ErrorDescription: "User was created successfully",
                 Extradata1: "",
                 Extradata2: ""
             });

             var payload = {
               message: {
                 TimeStamp: Date.now(),
                 Level: "info",
                 TransactionID: uuid.v1(),
                 TransactionType: "CreateUser",
                 Action: "Create new User",
                 Response: "Success",
                 ResponseTime: res.get("X-Response-Time"),
                 ResponseCode: "201",
                 SourceSystem: req.url,
                 TargetSystem: "STKPUSH",
                 ErrorDescription: "User was created successfully",
                 Extradata1: "",
                 Extradata2: ""
               }
             };
             splunk.send(payload, function (err, resp, body) {
                 // If successful, body will be { text: 'Success', code: 0 }
                 console.log("Response from Splunk", body);
             });
             return res.status(201).send(data);
        }).catch(err => {
            winston.log("error", "Some error occurred while creating user. "+err, {
              TimeStamp: Date.now(),
              TransactionID: uuid.v1(),
              TransactionType: "CreateUser",
              Action: "Create new User",
              Response: "Failed",
              ResponseTime: res.get("X-Response-Time"),
              ResponseCode: "500",
              SourceSystem: req.url,
              TargetSystem: "STKPUSH",
              ErrorDescription: "Some error occurred while creating user. "+err,
              Extradata1: "",
              Extradata2: ""
            });

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "CreateUser",
                Action: "Create new User",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "500",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "Some error occurred while creating user. "+err,
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            return res.status(500).send({
                message: err.message || "Some error occurred while creating user."
            });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            winston.log("info", "User list retrieved successfully", {
              TimeStamp: Date.now(),
              TransactionID: uuid.v1(),
              TransactionType: "QueryUserList",
              Action: "query users",
              Response: "Success",
              ResponseTime: res.get("X-Response-Time"),
              ResponseCode: "200",
              SourceSystem: req.url,
              TargetSystem: "STKPUSH",
              ErrorDescription: "User list was retrieved successfully",
              Extradata1: "",
              Extradata2: ""
            });

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "info",
                TransactionID: uuid.v1(),
                TransactionType: "QueryUserList",
                Action: "query users",
                Response: "Success",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "200",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "User list was retrieved successfully",
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            return res.status(200).send(users);
        }).catch(err => {
            winston.log("error", "Some error occurred while retrieving users. "+err, {
              TimeStamp: Date.now(),
              TransactionID: uuid.v1(),
              TransactionType: "QueryUserList",
              Action: "query users",
              Response: "Failed",
              ResponseTime: res.get("X-Response-Time"),
              ResponseCode: "500",
              SourceSystem: req.url,
              TargetSystem: "STKPUSH",
              ErrorDescription: "Some error occurred while retrieving user. "+err,
              Extradata1: "",
              Extradata2: ""
            });

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "CreateUser",
                Action: "Create new User",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "500",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "Some error occurred while creating user. "+err,
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                    winston.log(
                      "error",
                      "User not found with id " + req.params.userId,
                      {
                        TimeStamp: Date.now(),
                        TransactionID: uuid.v1(),
                        TransactionType: "QueryUserById",
                        Action: "Query User by Id",
                        Response: "Failed",
                        ResponseTime: res.get("X-Response-Time"),
                        ResponseCode: "404",
                        SourceSystem: req.url,
                        TargetSystem: "STKPUSH",
                        ErrorDescription: "User not found with id " + req.params.userId,
                        Extradata1: "",
                        Extradata2: ""
                      }
                    );

                    var payload = {
                      message: {
                        TimeStamp: Date.now(),
                        Level: "error",
                        TransactionID: uuid.v1(),
                        TransactionType: "QueryUserById",
                        Action: "Query User by Id",
                        Response: "Failed",
                        ResponseTime: res.get("X-Response-Time"),
                        ResponseCode: "404",
                        SourceSystem: req.url,
                        TargetSystem: "STKPUSH",
                        ErrorDescription:
                          "User not found with id " + req.params.userId,
                        Extradata1: "",
                        Extradata2: ""
                      }
                    };
                    splunk.send(payload, function(err, resp, body) {
                      // If successful, body will be { text: 'Success', code: 0 }
                      console.log("Response from Splunk", body);
                    });
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            winston.log("info", "User was retrieved successfully", {
              TimeStamp: Date.now(),
              TransactionID: uuid.v1(),
              TransactionType: "QueryUserById",
              Action: "query user by id",
              Response: "Success",
              ResponseTime: res.get("X-Response-Time"),
              ResponseCode: "200",
              SourceSystem: req.url,
              TargetSystem: "STKPUSH",
              ErrorDescription: "User was retrieved successfully",
              Extradata1: "",
              Extradata2: ""
            });

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "info",
                TransactionID: uuid.v1(),
                TransactionType: "QueryUserById",
                Action: "query user by id",
                Response: "Success",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "200",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "User was retrieved successfully",
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            res.status(200).send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                winston.log("error", "User not found", {
                  TimeStamp: Date.now(),
                  TransactionID: uuid.v1(),
                  TransactionType: "QueryUserById",
                  Action: "query user by id",
                  Response: "Failed",
                  ResponseTime: res.get("X-Response-Time"),
                  ResponseCode: "404",
                  SourceSystem: req.url,
                  TargetSystem: "STKPUSH",
                  ErrorDescription: "User not found",
                  Extradata1: "",
                  Extradata2: ""
                });

                var payload = {
                  message: {
                    TimeStamp: Date.now(),
                    Level: "error",
                    TransactionID: uuid.v1(),
                    TransactionType: "QueryUserById",
                    Action: "query user by id",
                    Response: "Failed",
                    ResponseTime: res.get("X-Response-Time"),
                    ResponseCode: "404",
                    SourceSystem: req.url,
                    TargetSystem: "STKPUSH",
                    ErrorDescription: "User not found",
                    Extradata1: "",
                    Extradata2: ""
                  }
                };
                splunk.send(payload, function(err, resp, body) {
                  // If successful, body will be { text: 'Success', code: 0 }
                  console.log("Response from Splunk", body);
                });
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            winston.log(
              "error",
              "Error retrieving user with id " + req.params.userId,
              {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "QueryUserById",
                Action: "Query user by Id",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "500",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "Error retrieving user with id " + req.params.userId,
                Extradata1: "",
                Extradata2: ""
              }
            );

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "QueryUserById",
                Action: "Query user by Id",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "500",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "Error retrieving user with id " + req.params.userId,
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        winston.log("error", "User content can not be empty", {
            TimeStamp: Date.now(),
            TransactionID: uuid.v1(),
            TransactionType: "CreateUser",
            Action: "Create new User",
            Response: "Failed",
            ResponseTime: res.get("X-Response-Time"),
            ResponseCode: "400",
            SourceSystem: req.url,
            TargetSystem: "STKPUSH",
            ErrorDescription: "User content can not be empty",
            Extradata1: "",
            Extradata2: ""
        });

        var payload = {
            message: {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "CreateUser",
                Action: "Create new User",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "400",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "User content can not be empty",
                Extradata1: "",
                Extradata2: ""
            }
        };
        splunk.send(payload, function (err, resp, body) {
            // If successful, body will be { text: 'Success', code: 0 }
            console.log("Response from Splunk", body);
        });
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, {
            new: true
        })
        .then(user => {
            if (!user) {
                   winston.log(
                     "error",
                     "User not found with id " + req.params.userId,
                     {
                       TimeStamp: Date.now(),
                       TransactionID: uuid.v1(),
                       TransactionType: "DeleteUserById",
                       Action: "delete user by id",
                       Response: "Failed",
                       ResponseTime: res.get("X-Response-Time"),
                       ResponseCode: "404",
                       SourceSystem: req.url,
                       TargetSystem: "STKPUSH",
                       ErrorDescription:
                         "User not found with id " + req.params.userId,
                       Extradata1: "",
                       Extradata2: ""
                     }
                   );

                   var payload = {
                     message: {
                       TimeStamp: Date.now(),
                       Level: "error",
                       TransactionID: uuid.v1(),
                       TransactionType: "DeleteUserById",
                       Action: "delete user by id",
                       Response: "Failed",
                       ResponseTime: res.get("X-Response-Time"),
                       ResponseCode: "404",
                       SourceSystem: req.url,
                       TargetSystem: "STKPUSH",
                       ErrorDescription:
                         "User not found with id " + req.params.userId,
                       Extradata1: "",
                       Extradata2: ""
                     }
                   };
                   splunk.send(payload, function(err, resp, body) {
                     // If successful, body will be { text: 'Success', code: 0 }
                     console.log("Response from Splunk", body);
                   });
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
               winston.log(
                 "info",
                 "User with id " + req.params.userId + " updated",
                 {
                   TimeStamp: Date.now(),
                   TransactionID: uuid.v1(),
                   TransactionType: "UpdateByUserId",
                   Action: "update user by id",
                   Response: "Success",
                   ResponseTime: res.get("X-Response-Time"),
                   ResponseCode: "201",
                   SourceSystem: req.url,
                   TargetSystem: "STKPUSH",
                   ErrorDescription:
                     "User with id " + req.params.userId + " updated",
                   Extradata1: "",
                   Extradata2: ""
                 }
               );

               var payload = {
                 message: {
                   TimeStamp: Date.now(),
                   Level: "info",
                   TransactionID: uuid.v1(),
                   TransactionType: "UpdateByUserId",
                   Action: "update user by id",
                   Response: "Success",
                   ResponseTime: res.get("X-Response-Time"),
                   ResponseCode: "201",
                   SourceSystem: req.url,
                   TargetSystem: "STKPUSH",
                   ErrorDescription:
                     "User with id " + req.params.userId + " updated",
                   Extradata1: "",
                   Extradata2: ""
                 }
               };
               splunk.send(payload, function(err, resp, body) {
                 // If successful, body will be { text: 'Success', code: 0 }
                 console.log("Response from Splunk", body);
               });
            res.status(201).send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                 winston.log(
                   "error",
                   "User not found with id " + req.params.userId,
                   {
                     TimeStamp: Date.now(),
                     TransactionID: uuid.v1(),
                     TransactionType: "UpdateByUserId",
                     Action: "update user by id",
                     Response: "Failed",
                     ResponseTime: res.get("X-Response-Time"),
                     ResponseCode: "404",
                     SourceSystem: req.url,
                     TargetSystem: "STKPUSH",
                     ErrorDescription:
                       "User not found with id " + req.params.userId,
                     Extradata1: "",
                     Extradata2: ""
                   }
                 );

                 var payload = {
                   message: {
                     TimeStamp: Date.now(),
                     Level: "error",
                     TransactionID: uuid.v1(),
                     TransactionType: "UpdateUserById",
                     Action: "update user by id",
                     Response: "Failed",
                     ResponseTime: res.get("X-Response-Time"),
                     ResponseCode: "404",
                     SourceSystem: req.url,
                     TargetSystem: "STKPUSH",
                     ErrorDescription:
                       "User not found with id " + req.params.userId,
                     Extradata1: "",
                     Extradata2: ""
                   }
                 };
                 splunk.send(payload, function(err, resp, body) {
                   // If successful, body will be { text: 'Success', code: 0 }
                   console.log("Response from Splunk", body);
                 });
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            winston.log(
              "error",
              "Error updating user with id " + req.params.userId,
              {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "QueryUserById",
                Action: "Query user by Id",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "500",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription:
                  "Error updating user with id " + req.params.userId,
                Extradata1: "",
                Extradata2: ""
              }
            );

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "error",
                TransactionID: uuid.v1(),
                TransactionType: "UpdateUserById",
                Action: "Update user by Id",
                Response: "Failed",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "500",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription:
                  "Error updating user with id " + req.params.userId,
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                winston.log(
                  "error",
                  "User not found with id " + req.params.userId,
                  {
                    TimeStamp: Date.now(),
                    TransactionID: uuid.v1(),
                    TransactionType: "DeleteUserById",
                    Action: "delete user by id",
                    Response: "Failed",
                    ResponseTime: res.get("X-Response-Time"),
                    ResponseCode: "404",
                    SourceSystem: req.url,
                    TargetSystem: "STKPUSH",
                    ErrorDescription:
                      "User not found with id " + req.params.userId,
                    Extradata1: "",
                    Extradata2: ""
                  }
                );

                var payload = {
                  message: {
                    TimeStamp: Date.now(),
                    Level: "error",
                    TransactionID: uuid.v1(),
                    TransactionType: "DeleteUserById",
                    Action: "delete user by id",
                    Response: "Failed",
                    ResponseTime: res.get("X-Response-Time"),
                    ResponseCode: "404",
                    SourceSystem: req.url,
                    TargetSystem: "STKPUSH",
                    ErrorDescription:
                      "User not found with id " + req.params.userId,
                    Extradata1: "",
                    Extradata2: ""
                  }
                };
                splunk.send(payload, function(err, resp, body) {
                  // If successful, body will be { text: 'Success', code: 0 }
                  console.log("Response from Splunk", body);
                });
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            winston.log(
              "info",
              "User with id " + req.params.userId + " deleted",
              {
                TimeStamp: Date.now(),
                TransactionID: uuid.v1(),
                TransactionType: "DeleteUserById",
                Action: "delete user by id",
                Response: "Success",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "204",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription:
                  "User with id " + req.params.userId + " deleted",
                Extradata1: "",
                Extradata2: ""
              }
            );

            var payload = {
              message: {
                TimeStamp: Date.now(),
                Level: "info",
                TransactionID: uuid.v1(),
                TransactionType: "DeleteUserById",
                Action: "delete user by id",
                Response: "Success",
                ResponseTime: res.get("X-Response-Time"),
                ResponseCode: "204",
                SourceSystem: req.url,
                TargetSystem: "STKPUSH",
                ErrorDescription: "User with id " + req.params.userId + " deleted",
                Extradata1: "",
                Extradata2: ""
              }
            };
            splunk.send(payload, function(err, resp, body) {
              // If successful, body will be { text: 'Success', code: 0 }
              console.log("Response from Splunk", body);
            });
            res.status(204).send({
                message: "User was deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                winston.log(
                  "error",
                  "User not found with id " + req.params.userId,
                  {
                    TimeStamp: Date.now(),
                    TransactionID: uuid.v1(),
                    TransactionType: "DeleteUserById",
                    Action: "delete user by id",
                    Response: "Failed",
                    ResponseTime: res.get("X-Response-Time"),
                    ResponseCode: "404",
                    SourceSystem: req.url,
                    TargetSystem: "STKPUSH",
                    ErrorDescription:
                      "User not found with id " + req.params.userId,
                    Extradata1: "",
                    Extradata2: ""
                  }
                );

                var payload = {
                  message: {
                    TimeStamp: Date.now(),
                    Level: "error",
                    TransactionID: uuid.v1(),
                    TransactionType: "DeleteUserById",
                    Action: "delete user by id",
                    Response: "Failed",
                    ResponseTime: res.get("X-Response-Time"),
                    ResponseCode: "404",
                    SourceSystem: req.url,
                    TargetSystem: "STKPUSH",
                    ErrorDescription:
                      "User not found with id " + req.params.userId,
                    Extradata1: "",
                    Extradata2: ""
                  }
                };
                splunk.send(payload, function(err, resp, body) {
                  // If successful, body will be { text: 'Success', code: 0 }
                  console.log("Response from Splunk", body);
                });
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
               winston.log(
                 "error",
                 "Could not delete user with id " + req.params.userId,
                 {
                   TimeStamp: Date.now(),
                   TransactionID: uuid.v1(),
                   TransactionType: "DeleteUserById",
                   Action: "delete user by id",
                   Response: "Failed",
                   ResponseTime: res.get("X-Response-Time"),
                   ResponseCode: "500",
                   SourceSystem: req.url,
                   TargetSystem: "STKPUSH",
                   ErrorDescription:"Could not delete user with id " + req.params.userId,
                   Extradata1: "",
                   Extradata2: ""
                 }
               );

               var payload = {
                 message: {
                   TimeStamp: Date.now(),
                   Level: "error",
                   TransactionID: uuid.v1(),
                   TransactionType: "DeleteUserById",
                   Action: "delete user by id",
                   Response: "Failed",
                   ResponseTime: res.get("X-Response-Time"),
                   ResponseCode: "500",
                   SourceSystem: req.url,
                   TargetSystem: "STKPUSH",
                   ErrorDescription:
                     "Could not delete user with id " + req.params.userId,
                   Extradata1: "",
                   Extradata2: ""
                 }
               };
               splunk.send(payload, function(err, resp, body) {
                 // If successful, body will be { text: 'Success', code: 0 }
                 console.log("Response from Splunk", body);
               });
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};