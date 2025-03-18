const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).send("fill required details");
    } else {
      const alreadyExists = await User.findOne({ name, email });
      if (alreadyExists) {
        return res.status(500).send("User already exists");
      } else {
        let newUser = new User({ name, email });
        bcrypt.hash(password, 10, (err, hashPassword) => {
          newUser.password = hashPassword;
          newUser.save();
          next();
        });
        console.log(newUser);

        return res.redirect("login");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(400).send("fill required details");
    } else {
      const alreadyExists = await User.findOne({ email });
      if (!alreadyExists) {
        return res.status(400).json({ error: "user not found" });
      } else {
        const validateUser = await bcrypt.compare(
          password,
          alreadyExists.password
        );
        if (!validateUser) {
          return res
            .status(400)
            .send("User not found, incorrect password or email");
        } else {
          isAuthenticated = true;
          console.log(alreadyExists);
          const payload = {
            userId: alreadyExists._id,
            email: alreadyExists.email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";

          const token = jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 24 * 60 * 60 },
            async (err, token) => {
              await User.updateOne(
                { _id: alreadyExists._id },
                { $set: { token } }
              );
              alreadyExists.save();
              // return res.status(200).json({
              //   name: alreadyExists.name,
              //   email: alreadyExists.email,
              //   token: token,
              // });
              return res.redirect(`/api/tasks/${alreadyExists._id}`)
            }
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     console.log(user);
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, "secret key", {
//       expiresIn: "1h",
//     });

//     // Store token in the database for reference
//     console.log("token " + token);
//     console.log("user " + user.token);
//     user.token = token;
//     await user.save();

//     // res.json({ token });
//     res.redirect(`/api/tasks/${user._id}`);
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };



module.exports = { register, login };
