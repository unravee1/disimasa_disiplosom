import { Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.find();
        return res.json(types);
    }

    async delete(req, res) {
        const { id } = req.body;
        await Type.findByIdAndDelete(id);
        return res.json('Success');
    }

    async updateType(req, res) {
        const id = req.params.id;
        Type.findByIdAndUpdate(id, req.body, { new: true })
            .then(type => {
                if (type) {
                    res.send({ message: "Type was updated successfully.", type });
                } else {
                    res.send({ message: `Cannot update Type with id=${id}. Maybe Type was not found or req.body is empty!` });
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error updating Type with id=" + id });
            });
    }
}

export default new TypeController();
