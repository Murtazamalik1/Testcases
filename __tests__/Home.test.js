import React from "react";
import renderer from 'react-test-renderer';
import HomeScreen from "../Components/Home";
import moxios from 'moxios';

const createTestProps = props => ({
    navigation: {
        navigate: jest.fn(),
        state: jest.fn()
    },
    ...props,
});

describe('Home Page', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    props = createTestProps({});

    it('should fetch data successfully', (done) => {
        const Component = renderer.create(<HomeScreen{...props}
        />).getInstance();

        const mockedData = [
            { id: 1, title: 'iPhone 9', brand: "Apple", },
            // Add more mocked data as needed
        ];
        // Mock the API call 
        moxios.stubRequest('https://dummyjson.com/products', {
            status: 200,
            response: mockedData, // Mocked response data
        })
        Component.getApi()
        setTimeout(() => {
            // Check if the fetched products are rendered in the component
            expect(Component.state.data).toEqual(mockedData);
            expect(moxios.requests.mostRecent().url).toBe('https://dummyjson.com/products');
            expect(moxios.requests.mostRecent().config.method).toBe('get');
            done();
        }, 3000)
    });
})
