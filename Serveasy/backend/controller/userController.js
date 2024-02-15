/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const comparePassword = require("./../utils/comparePassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email) => {
  return jwt.sign(
    { id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET_USER,
    {
      expiresIn: maxAge,
    },
  );
};

// Insert a user
exports.registerUser = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const {
      user_id,
      user_name,
      full_name,
      email,
      password: Npassword,
      phone_number,
    } = req.body; // Destructure user_id and Name from req.body
    if (!email || !Npassword)
      return res.json({
        status: "error",
        error: "Please enter your email and password",
      });
    else {
      connection.query(
        "SELECT email FROM user WHERE email=?",
        [email],
        (err, result) => {
          // connection.release();
          if (err) throw err;
          if (result && result.length > 0)
            // Check if email already exists
            return res.json({
              status: "error",
              error: "Email has already been registered",
            });
          else {
            // Hash the password using bcrypt
            bcrypt.hash(Npassword, 8, (err, password) => {
              if (err) throw err;
              // Insert user into the database
              connection.query(
                "INSERT INTO user (user_id, user_name,full_name,email, password,phone_number) VALUES (?, ?, ?, ?,?,?)",
                [user_id, user_name, full_name, email, password, phone_number],
                (err, rows) => {
                  connection.release();
                  const token = createToken(user_id, email);
                  if (!err) {
                    res.cookie("jwt", token, {
                      httpOnly: true,
                      maxAge: maxAge * 1000,
                    });
                    res.status(201).json({ status: "success" });
                  } else {
                    // console.log(err);
                    res.json({
                      status: "failure",
                      error: err,
                    });
                  }
                },
              );
            });
          }
        },
      );
    }
  });
};
exports.loginUser = (req, res) => {
  const { email, password: checkPassword } = req.body;
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT user_id,email,password FROM user WHERE email=?",
      [email],
      async (err, result) => {
        connection.release();
        if (err) {
          // Handle the error
          console.log("Error retrieving user:", err);
          return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
        }
        if (result.length === 0) {
          // If user not found, send appropriate response
          return res
            .status(404)
            .json({ status: "error", error: "User not found" });
        }
        if (result.length === 1) {
          const storedPassword = result[0].password;
          const storedEmail = result[0].email;
          const stored_user_id = result[0].user_id;
          // console.log(user_id);
          try {
            const passwordsMatch = await comparePassword(
              checkPassword,
              storedPassword,
            );
            if (passwordsMatch) {
              const token = createToken(stored_user_id, email);
              res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
              });
              res.json({ status: "success" });
            } else {
              return res
                .status(401)
                .json({ status: "error", error: "Incorrect Password" });
            }
          } catch (error) {
            console.error("Error comparing passwords:", error);
            return res
              .status(500)
              .json({ status: "error", error: "Internal Server Error" });
          }
        }
      },
    );
  });
};

exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  // res.redirect("/");
  res.status(200).json({ success: "Redirecting to Landing Page" });
};
exports.redirectUserHome = (req, res) => {
  //res.redirect("http://localhost:5173/home"); // Redirect to the home page
  res.status(200).json({ success: "Redirecting to User Home Page" });
};

exports.registerOrder = (req, res) => {
  const pool = req.pool;
  const { orders_id, user_id, created_at, num_of_foods, foods } = req.body; // Destructure order_id, user_id, and foods array from req.body

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to connect to database" });
      return;
    }

    // Begin a transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to begin transaction" });
        return;
      }

      // Insert into orders table
      connection.query(
        "INSERT INTO orders (orders_id, user_id, created_at, num_of_foods) VALUES (?, ?, ?, ?)",
        [orders_id, user_id, created_at, num_of_foods],
        (err, orderResult) => {
          if (err) {
            connection.rollback(() => {
              console.error(err);
              res.status(500).json({ error: "Failed to register the order" });
            });
            return;
          }

          // Insert into ordered_items table
          let insertCount = 0;
          foods.forEach(
            ({
              order_id,
              food_name,
              ingredients,
              amount,
              delivery_time,
              address,
            }) => {
              connection.query(
                "INSERT INTO ordered_items (order_id, food_name, ingredients, user_id, quantity, orders_id, delivery_time, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  order_id,
                  food_name,
                  ingredients,
                  user_id,
                  amount,
                  orders_id,
                  delivery_time,
                  address,
                ],
                (err) => {
                  if (err) {
                    connection.rollback(() => {
                      console.error(err);
                      res.status(500).json({
                        error: "Failed to register the ordered items",
                      });
                    });
                  } else {
                    insertCount++;
                    if (insertCount === foods.length) {
                      // All inserts successful
                      // Commit the transaction
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            console.error(err);
                            res
                              .status(500)
                              .json({ error: "Failed to commit transaction" });
                          });
                        } else {
                          connection.release();
                          res.status(201).json({
                            status: "success",
                            message: "Order registered successfully",
                          });
                        }
                      });
                    }
                  }
                },
              );
            },
          );
        },
      );
    });
  });
};

exports.giveRecommendationData = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);

    connection.query("Select * from recommendation_data", (err, rows) => {
      connection.release();

      if (!err) {
        res.status(200).json({
          status: "success",
          results: rows.length,
          data: {
            rows,
          },
          // data,
        });
      } else {
        console.log(err);
      }
    });
  });
};
