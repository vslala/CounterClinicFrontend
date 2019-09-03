import React from 'react';
import {mount, shallow} from "enzyme";
import CounterClinicAppBar from "./CounterClinicAppBar";
import NavigationDrawer from "../NavigationDrawer";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";

describe('CounterClinicAppBar Component Test', () => {

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => setState)

    it('should contain a NavigationDrawer Component', function () {
        let wrapper = shallow(<CounterClinicAppBar/>);
        expect(wrapper.find(NavigationDrawer)).toHaveLength(1);
    });

    it('should contain the AppBar', function () {
        let wrapper = shallow(<CounterClinicAppBar/>);
        expect(wrapper.find(AppBar)).toHaveLength(1);
    });

    it('should contain the AppBar with ToolBar, IconButton and Title of h6', function () {
        let wrapper = shallow(<CounterClinicAppBar/>);
        let toolBar = wrapper.find(AppBar).find(Toolbar);
        expect(toolBar).toHaveLength(1);
        expect(toolBar.find(IconButton)).toHaveLength(1);
        expect(toolBar.find(Typography)).toHaveLength(1);
        expect(toolBar.find(Typography).props().variant).toBe('h6');
    });

    it('should open the drawer when the toggleDrawer method is called', function () {
        let wrapper = shallow(<CounterClinicAppBar/>);
        let toolBar = wrapper.find(AppBar).find(Toolbar);
        toolBar.find(IconButton).simulate('click');
        expect(wrapper.find(NavigationDrawer).props().isOpen).toBe(true);
    });

    it('should close the drawer by setting the isOpen property on the NagigationDrawer to false', function () {
        let wrapper = shallow(<CounterClinicAppBar/>);
        wrapper.find(NavigationDrawer).prop('handleDrawerClose')();
        expect(wrapper.find(NavigationDrawer).props().isOpen).toBe(false);
    });


})