import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" }
});

const BasketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const BasketDeviceSchema = new Schema({
    basket: { type: Schema.Types.ObjectId, ref: 'Basket' },
    device: { type: Schema.Types.ObjectId, ref: 'Device' }
});

const DeviceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    img: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    info: [{ type: Schema.Types.ObjectId, ref: 'DeviceInfo' }]
});

const TypeSchema = new Schema({
    name: { type: String, unique: true, required: true }
});

const BrandSchema = new Schema({
    name: { type: String, unique: true, required: true }
});

const DeviceInfoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    device: { type: Schema.Types.ObjectId, ref: 'Device' }
});

const RatingSchema = new Schema({
    rate: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    device: { type: Schema.Types.ObjectId, ref: 'Device' }
});

const User = mongoose.model('User', UserSchema);
const Basket = mongoose.model('Basket', BasketSchema);
const BasketDevice = mongoose.model('BasketDevice', BasketDeviceSchema);
const Device = mongoose.model('Device', DeviceSchema);
const Type = mongoose.model('Type', TypeSchema);
const Brand = mongoose.model('Brand', BrandSchema);
const DeviceInfo = mongoose.model('DeviceInfo', DeviceInfoSchema);
const Rating = mongoose.model('Rating', RatingSchema);

export { User, Basket, BasketDevice, Device, Type, Brand, DeviceInfo, Rating };
