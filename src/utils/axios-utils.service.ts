import { Injectable } from '@nestjs/common';
import axios from 'axios';

/**
 * Utility service for HTTP client operations
 * Provides axios-based HTTP request functionality for external API calls
 * TODO: Implement HTTP request wrapper methods as needed
 */
@Injectable()
export class AxiosUtilsService {

    get(endpoint: string, headers: Object) {
        return axios.get(endpoint, headers)
    }

    post() { }

    patch() { }

    delete() { }
}
