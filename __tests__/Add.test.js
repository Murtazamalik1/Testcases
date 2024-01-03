import React from "react";
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import AddUser from "../components/CrudOperation/Add";

const mockedResponse = {
    "id": 101,
    "firstName": "murtaza",
    "lastName": "malik",
    "email": "murtazamalik@123"
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
        const Component = renderer.create(<AddUser{...props}
        />).getInstance();

        Component.state.firstName = "murtaza"
        Component.state.lastName = "malik"
        Component.state.email = "murtazamalik@123"
        // Mock the API call 
        moxios.stubRequest('https://dummyjson.com/users/add', {
            status: 200,
            response: mockedResponse  // Mocked response data
        })
        Component.handleCreateUser()
        setTimeout(() => {
            // Check if the fetched products are rendered in the component
           expect(Component.state.apiRespone).toEqual(mockedResponse);
            expect(moxios.requests.mostRecent().url).toBe('https://dummyjson.com/users/add');
            // expect(moxios.requests.mostRecent().config.method).toBe('post');
            done();
        }, 1000)
    });
})
