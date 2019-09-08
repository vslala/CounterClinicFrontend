import React from 'react';
import Login from "./Login";
import {shallow} from 'enzyme';
import LoginForm from "../../components/LoginForm/LoginForm";
import {Redirect} from "react-router-dom";

describe('Login Container Tests', () => {

    let mockedFetch;
    const mockFetch = async (mockSuccessResponse) => {
        let mockJsonPromise = Promise.resolve(mockSuccessResponse);
        let mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
            ok: true
        });
        mockedFetch = await jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    };

    let mockedLocalStorage;
    let mockLocalStorage = (mockGetValue) => {
        mockedLocalStorage = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
        mockedLocalStorage.mockReturnValue(mockGetValue);
    }

    let mockHistory = {push: jest.fn()};

    beforeEach(() => {
        mockLocalStorage("{}");
    })

    afterEach(() => {
        if (mockedFetch)
            mockedFetch.mockReset();
        if (mockedLocalStorage)
            mockedLocalStorage.mockReset();
    })

    it('should check if the user is already logged in and redirected to the dashboard', function () {
        mockLocalStorage('{"userId": 1, "roles": ["DOCTOR"]}');
        let wrapper = shallow(<Login history={mockHistory} />);
        expect(wrapper.find(Redirect).length).toBe(1);
    });

    it('should render login form when the user is not logged in', function () {
        let wrapper = shallow(<Login history={mockHistory}/>);
        expect(wrapper.find(LoginForm).length).toBe(1);
    });

    it('should call handleLogin method on clicking the login button inside LoginForm', () => {
        mockFetch({
            user: {
                userId: 1,
                firstName: 'Foo',
                lastName: 'Bar',
                fullName: 'Foo Bar'
            }
        });
        mockLocalStorage("{}");
        let wrapper = shallow(<Login history={mockHistory} />);
        wrapper.find(LoginForm).prop('handleLogin')({username: 'vslala', password: 'simplepass'});
    });
})