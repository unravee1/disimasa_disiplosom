import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // отримуємо токен з заголовка
        if (!token) {
            return next(ApiError.unauthorized('Користувач не авторизований'));
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return next(ApiError.unauthorized('Користувач не авторизований'));
    }
}
