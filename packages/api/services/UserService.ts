/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddUserRequestDTO } from '../models/AddUserRequestDTO';
import type { UpdateUserRequestDTO } from '../models/UpdateUserRequestDTO';
import type { UserResponseDTO } from '../models/UserResponseDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @returns UserResponseDTO OK
     * @throws ApiError
     */
    public static getAllUsers(): CancelablePromise<Array<UserResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User',
        });
    }
    /**
     * @param requestBody
     * @returns UserResponseDTO OK
     * @throws ApiError
     */
    public static createUser(
        requestBody: AddUserRequestDTO,
    ): CancelablePromise<UserResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns UserResponseDTO OK
     * @throws ApiError
     */
    public static getUserById(
        id: string,
    ): CancelablePromise<UserResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns UserResponseDTO OK
     * @throws ApiError
     */
    public static updateUser(
        id: string,
        requestBody: UpdateUserRequestDTO,
    ): CancelablePromise<UserResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/User/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns UserResponseDTO OK
     * @throws ApiError
     */
    public static deleteUser(
        id: string,
    ): CancelablePromise<UserResponseDTO> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/User/{id}',
            path: {
                'id': id,
            },
        });
    }
}
