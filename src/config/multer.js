import multer from 'multer';
//biblioteca do node: crypto
import crypto from 'crypto';
import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                return cb(null, res.toString('hex') + extname(file.originalname));

            })
        },
    }),
};