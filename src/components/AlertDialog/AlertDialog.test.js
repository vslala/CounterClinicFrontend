import React from 'react';
import {shallow} from "enzyme";
import AlertDialog from "./AlertDialog";
import {Button, Dialog, DialogContent, DialogTitle} from "@material-ui/core";

describe('AlertDialog Component Test', () => {

    let handleClose = jest.fn();

    let wrapper = shallow(<AlertDialog open={true} handleClose={handleClose} title={"Some Title"} content={"Some Content"}/>);

    it('should contain Dialog component from Material UI', function () {
        expect(wrapper.find(Dialog).length).toBe(1);
    });

    it('Dialog Component should contain Title and Content from Material UI', function () {
        expect(wrapper.find(Dialog).find(DialogTitle).length).toBe(1);
        expect(wrapper.find(Dialog).find(DialogContent).length).toBe(1);
    });

    it('should contain button', function () {
        expect(wrapper.find(Dialog).find(Button).length).toBe(1);
    });

    it('should call the handleClose function when the button is clicked', function () {
        wrapper.find(Dialog).find(Button).simulate('click');
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should render multiple buttons if userActions are passed', function () {
        let userActions = [
            {text: 'Foo', color: 'grey', perform: jest.fn()}
        ];
        wrapper = shallow(<AlertDialog open={true} handleClose={handleClose} title={'Some title'} content={'Some Content'} userActions={userActions}/>);
        wrapper.find(Button).forEach(btn => btn.simulate('click'));
        expect(userActions[0].perform).toHaveBeenCalledTimes(1);
    });
})