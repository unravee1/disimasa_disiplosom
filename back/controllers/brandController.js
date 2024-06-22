import { Brand } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.find();
        return res.json(brands);
    }

    async delete(req, res) {
        const { id } = req.body;
        await Brand.findByIdAndDelete(id);
        return res.json('Success');
    }

    async updateBrand(req, res) {
        const id = req.params.id;
        Brand.findByIdAndUpdate(id, req.body, { new: true })
            .then(brand => {
                if (brand) {
                    res.send({ message: "Brand was updated successfully.", brand });
                } else {
                    res.send({ message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!` });
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error updating Brand with id=" + id });
            });
    }
}

export default new BrandController();
