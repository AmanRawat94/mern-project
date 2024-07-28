const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// const User = mongoose.model('User', userSchema);
//securing the password with bycryptjs
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     next();
//   }
//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, saltRound);
//     user.password = hash_password;
//   } catch (error) {
//     next(error);
//   }
// });

//json web token
// userSchema.methods.generateToken = function () {
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email,
//         isAdmin: this.isAdmin,
//         isSuperAdmin: this.isSuperAdmin,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "30d",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// comparePassword
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = new model("User", userSchema);

module.exports = User;
