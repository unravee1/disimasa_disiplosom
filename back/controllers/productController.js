import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Device, DeviceInfo } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuidv4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const product = await Device.create({ name, price, brand: brandId, type: typeId, img: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        device: product._id
                    })
                );
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let products;
        if (!brandId && !typeId) {
            products = await Device.find().limit(limit).skip(offset);
        }
        if (brandId && !typeId) {
            products = await Device.find({ brand: brandId }).limit(limit).skip(offset);
        }
        if (!brandId && typeId) {
            products = await Device.find({ type: typeId }).limit(limit).skip(offset);
        }
        if (brandId && typeId) {
            products = await Device.find({ brand: brandId, type: typeId }).limit(limit).skip(offset);
        }
        const totalCount = await Device.countDocuments({});
        return res.json({ products, totalCount });
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Device.findById(id).populate('info');
        return res.json(product);
    }

    async delete(req, res) {
        const { id } = req.params;
        await Device.findByIdAndDelete(id);
        return res.json('Success');
    }
}

export default new ProductController();
