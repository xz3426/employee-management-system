const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  authorization: {
    type: String,
    require: true,
  },
  profileImageUrl: {
    type: String,
    default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAeAMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUDBgcC/8QAORAAAQMDAAYGBwcFAAAAAAAAAAECAwQFEQYSITFBUTJhcYHB0RMUQ1KRobEVFiIjM0JyB1NzktL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAGCpqGwMyu1y7k5gZJJGxt1nuRqc1IU1w4RN73eRDllfK7WeuV+h4LiMzqqd3tFTs2Hj00v8Acf8A7KeAXBmbVTt9oq9u0kw3DhK3vb5EADBeRyNkbrMcjk6j2UcUr4nazFwv1LWmqGzMymxyb05ExWcAEAAAAAB4lekbFe7chTTSOlkV7t68ORMucvRjTtXwIBqIAAIDC8jUNI9JZWzvpLa/URi4kmTGVXijeXaax61U+k9J6xNr+96R2fjkDqwNQ0c0lldOykuT9dHriOZd6LwRefabeAPcUropEe3enzPAAvInpIxHt3KeyvtkvSjXdvTxLAy0AAAAAKasdrVMnUuDCe5/15P5KeDSBEus7qW2VVQzpxxOVq9fAlkW5wLVW2qgamXSROa1OvGwI5cgALoHULVO6qtlLUP6ckTXOXrxtOXnUbXAtLbaWByYdHE1rk68bQJQAIM1G7VqY+tcFyUcH68f8kLwlWAAIoAAKasbq1MnWuTCT7nF0ZE7F8CAaiABgrKynooVlqpmxsTivFeSJxA1u/aLPmnfU21WIr1y+Fy4280XwUovu/dtbV9Rk7ctx9S8rNM2o5UoqXWT35lxnuTzIP3wuec+jpcctR3/AEVE+w6LPhnZU3JWKrFyyFq5281XwNrNTo9M2q5EraXVT34VzjuXzNlo6ynrYUlpZmyMXinBeSpwUgzgADNRt1qmNOS5Lkr7ZF0pFTZuTxLAlagACAAAPEjEkYrHJsUppY3RSKx29OPMvDBU07J2YXY5Ny8iyjXLpcIrZRvqZtuNjWZ2vdwQ5zca+ouNSs9S/Wdua1NzU5Ihd6dyVCXRlNKxzIom/l5TY9V3qnyQ1o0zQAFTQlW6vqLdUJPSv1XJsVq7nJyVCKBhrqFruENyo2VMOzOxzeLXcUJ0UTpZEY1Nq/I0bQOSoW6PpomPfFK38zCbGKm5V+aHTqanbA3CbXLvXmZtajJExI2IxqbEPYBlQAAAAAAAEWvoKa407oKyFksa/tcm7s5Gl3X+n34lfaqrCL7Kfh2OTxTvN+AHHqnRa+U6rr2+R7feiVHovwXJE+xrpnH2bWZ/wO8jtmAXUxx6m0VvlSqalvkY33pVRiJ8VybHav6ffiSS61Wceyg8XL5d5vuEGEG0xGoKCmt8DYKOFkUSftan15koAigAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"
  },
  // firstName:{
  //   type: String,
  // },
  // lastName:{
  //   type: String,
  // },

  // middleName:{
  //   type: String,
  // },

  // preferredName:{
  //   type: String,
  // },

  // address:{
  //   type: String,
  // },
  // phone:{
  //   type: String,
  // },
  // ssn:{
  //   type: String,
  // },
  // birthDate:{
  //   type: Date,
  // },
  // gender:{
  //   type: String,
  // },
  // isUSCitizen: {
  //   type: Boolean,
  //   // required: true,
  // },
  // workAuthorization: {
  //   type: String,
  //   // required: function () {
  //   //   return !this.isUSCitizen;
  //   // },
  // },

  // visaTitle: String,
  // startEndDate: {
  //   startDate: Date,
  //   endDate: Date,
  // },
  // optReceipt: String, // URL or file path

  // reference: {
  //   firstName: String,
  //   lastName: String,
  //   middleName: String,
  //   phone: String,
  //   email: String,
  //   relationship: String,
  // },
  // emergencyContacts: [
  //   {
  //     firstName: String,
  //     lastName: String,
  //     middleName: String,
  //     phone: String,
  //     email: String,
  //     relationship: String,
  //   },
  // ],
  // uploadedDocuments: {
  //   profilePicture: String, // URL or file path
  //   driversLicense: String, // URL or file path
  //   workAuthorizationDocument: String, // URL or file path
  // },

});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
