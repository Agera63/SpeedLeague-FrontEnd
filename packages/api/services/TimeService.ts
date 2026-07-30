/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddTimeRequestDTO } from '../models/AddTimeRequestDTO';
import type { TimeResponseDTO } from '../models/TimeResponseDTO';
import type { UpdateTimeRequestDTO } from '../models/UpdateTimeRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TimeService {
    /**
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static getAllTimes(): CancelablePromise<Array<TimeResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Time',
        });
    }
    /**
     * @param requestBody
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static createTime(
        requestBody: AddTimeRequestDTO,
    ): CancelablePromise<TimeResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Time',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static getTimeById(
        id: string,
    ): CancelablePromise<TimeResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Time/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static updateTime(
        id: string,
        requestBody: UpdateTimeRequestDTO,
    ): CancelablePromise<TimeResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Time/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static deleteTime(
        id: string,
    ): CancelablePromise<TimeResponseDTO> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Time/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param carId
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static getTimeByCarId(
        id: string,
        carId?: string,
    ): CancelablePromise<Array<TimeResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Time/car/{id}',
            path: {
                'id': id,
            },
            query: {
                'carId': carId,
            },
        });
    }
    /**
     * @param id
     * @param trackId
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static getTimeByTrackId(
        id: string,
        trackId?: string,
    ): CancelablePromise<Array<TimeResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Time/track/{id}',
            path: {
                'id': id,
            },
            query: {
                'trackId': trackId,
            },
        });
    }
    /**
     * @param id
     * @param userId
     * @returns TimeResponseDTO OK
     * @throws ApiError
     */
    public static getTimeByUserId(
        id: string,
        userId?: string,
    ): CancelablePromise<Array<TimeResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Time/user/{id}',
            path: {
                'id': id,
            },
            query: {
                'userId': userId,
            },
        });
    }
}
