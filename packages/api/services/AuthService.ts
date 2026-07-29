/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequestModel } from '../models/LoginRequestModel';
import type { LoginResponseModel } from '../models/LoginResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns LoginResponseModel OK
     * @throws ApiError
     */
    public static postApiAuthLogin(
        requestBody: LoginRequestModel,
    ): CancelablePromise<LoginResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/Login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
