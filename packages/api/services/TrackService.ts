/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddTrackRequestDTO } from '../models/AddTrackRequestDTO';
import type { TrackResponseDTO } from '../models/TrackResponseDTO';
import type { UpdateTrackRequestDTO } from '../models/UpdateTrackRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TrackService {
    /**
     * @returns TrackResponseDTO OK
     * @throws ApiError
     */
    public static getAllTracks(): CancelablePromise<Array<TrackResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Track',
        });
    }
    /**
     * @param requestBody
     * @returns TrackResponseDTO OK
     * @throws ApiError
     */
    public static createTrack(
        requestBody: AddTrackRequestDTO,
    ): CancelablePromise<TrackResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Track',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns TrackResponseDTO OK
     * @throws ApiError
     */
    public static getTrackById(
        id: string,
    ): CancelablePromise<TrackResponseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Track/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns TrackResponseDTO OK
     * @throws ApiError
     */
    public static updateTrack(
        id: string,
        requestBody: UpdateTrackRequestDTO,
    ): CancelablePromise<TrackResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Track/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns TrackResponseDTO OK
     * @throws ApiError
     */
    public static deleteTrack(
        id: string,
    ): CancelablePromise<TrackResponseDTO> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Track/{id}',
            path: {
                'id': id,
            },
        });
    }
}
