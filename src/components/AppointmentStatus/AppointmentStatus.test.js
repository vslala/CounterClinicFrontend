import React from 'react';
import {shallow} from "enzyme";
import AppointmentStatus from "./AppointmentStatus";
import {Paper} from "@material-ui/core";

describe('AppointmentStatus Component Test', () => {


    let mockLocalStorage = (mockGetValue) => {
        const getItemSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
        getItemSpy.mockReturnValue(mockGetValue);
    }
    
    describe('Happy Path Scenarios', () => {
        it('should contain the Paper component as the wrapper', function () {
            mockLocalStorage('{"userId": 1}');

            let wrapper = shallow(<AppointmentStatus/>);
            expect(wrapper.find(Paper).length).toBe(1);
        });

    })


})