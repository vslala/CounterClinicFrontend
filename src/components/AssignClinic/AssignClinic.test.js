import React from 'react';

describe('AssignClinic Component Test', () => {

    let mockedFetch;

    const mockFetch = async (mockSuccessResponse) => {
        let mockJsonPromise = Promise.resolve(mockSuccessResponse);
        let mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
            ok: true
        });
        mockedFetch = await jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    };


    it('should ', function () {
        
    });
})