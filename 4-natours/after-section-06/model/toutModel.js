const  mongoose  = require('mongoose');
const slugify = require('slugify');

const nodejs = new mongoose.Schema({
    name: {
      type:String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty']
    },
    raitingAverage: {
      type:Number,
      default:0 
    },
    raitingQuantity: {
      type: Number,
      default:0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date] 
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  });
  nodejs.virtual('durationWeeks').get(function(){
    return this.duration / 7;
  });
  nodejs.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
  });

  const nodejsTour = mongoose.model('nodejsTour', nodejs);

  module.exports = nodejsTour;