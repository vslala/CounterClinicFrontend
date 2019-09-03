import React from 'react';
import {mount, shallow} from "enzyme";
import AppointmentDetail from "./AppointmentDetail";
import {CircularProgress, List, Paper} from "@material-ui/core";

describe('AppointmentDetail Component Test', () => {

    let mockedFetch;

    const mockFetch = async (mockSuccessResponse) => {
        let mockJsonPromise = Promise.resolve(mockSuccessResponse);
        let mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
            ok: true
        });
        mockedFetch = await jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    };

    let responses = {
        mockSuccessResponse : {
            appointmentStatus: {
                patientsInVisitedQueue: 2
            },
            walkInAppointment: {
                patientFullName: 'Foo Bar'
            },
            appointedDoctor: {
                fullName: 'Buzz Aldrin'
            },
            qrCode: {height: 300}
        }
    }


    it('should mock the global fetch', async done => {
        mockFetch({});
        const wrapper = mount(<AppointmentDetail/>);

        process.nextTick(() => {

            expect(mockedFetch).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('should render image inside the first div inside List', done => {

        mockFetch(responses.mockSuccessResponse);
        let wrapper = mount(<AppointmentDetail/>);

        process.nextTick(() => {
            console.log("Test Execution Complete");
            wrapper.update();
            expect(wrapper.find(Paper).find(List).find('div').first().find('img')).toHaveLength(1);
            done();
        });
    });

    it('should render Circular Progress Bar', done => {

        mockFetch(responses.mockSuccessResponse);
        let wrapper = mount(<AppointmentDetail/>);

        process.nextTick(() => {
            console.log("Test Execution Complete");
            expect(wrapper.find(Paper).find(CircularProgress)).toHaveLength(1);
            done();
        });
    });

})