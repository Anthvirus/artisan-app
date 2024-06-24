import { baseUrl } from "../constants/server";
import axios from './axios';

export default axios.create({
    baseUrl
})