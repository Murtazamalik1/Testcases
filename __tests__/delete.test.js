import React from "react";
import renderer from 'react-test-renderer';
import moxios from 'moxios';;
import DeleteUser from "../Components/CrudOperation/Delete";

const mockedResponse = {
    "id": 1,
    "firstName": "Terry",
    "lastName": "Medhurst",
    "maidenName": "Smitham",
    "age": 50,
    "gender": "male",
};
const createTestProps = props => ({
    navigation: {
        navigate: jest.fn(),
        state: jest.fn()
    },
    ...props,
});

describe('Add Page', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    props = createTestProps({});

    it('should fetch data successfully', (done) => {
        const Component = renderer.create(<DeleteUser{...props}
        />).getInstance();

        Component.state.firstName = "Terry"
        Component.state.lastName = "Medhurst"
        Component.state.maidenName = "Smitham"
        Component.state.age = 50
        Component.state.gender = "male"

        moxios.stubRequest('https://dummyjson.com/users/1', {
            status: 200,
            response: mockedResponse  // Mocked response data
        })
        Component.handleDeleteUser()
        setTimeout(() => {
            // Check if the fetched products are rendered in the component
            expect(Component.state.firstName).toEqual(mockedResponse.firstName);
            expect(Component.state.lastName).toEqual(mockedResponse.lastName);
            expect(Component.state.age).toEqual(mockedResponse.age);
            done();
        }, 1000)
    });
})
