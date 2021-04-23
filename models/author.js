const { DateTime } = require("luxon");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  if (this.date_of_birth) {
    if (this.date_of_death)
      return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' - '
	   + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) 
	   + ', ' + 
	(this.date_of_death.getYear() - this.date_of_birth.getYear()).toString() + ' years old.';
    else
      return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' -';
  } else 
    return "Missing Date of Birth and Death";
});

// Little challenge for improving the date of birth and death format
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);