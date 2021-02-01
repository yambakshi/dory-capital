import { env } from '../config';
import cloudinary from 'cloudinary';

cloudinary.v2.config(env.cloudinary);