import React from "react";
import renderer from 'react-test-renderer';
import Login from "../components/Login";
import moxios from 'moxios';

const mockedResponse = {
  "id": 15,
  "username": "kminchelle",
  "password": "0lelplR",
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
    const Component = renderer.create(<Login{...props}
    />).getInstance();
    Component.state.username = "kminchelle"
    Component.state.password = "0lelplR"
    // Mock the API call 
    moxios.stubRequest('https://dummyjson.com/auth/login', {
      status: 200,
      response: mockedResponse  // Mocked response data
    })
    Component.handleLogin()
    setTimeout(() => {
      // Check if the fetched products are rendered in the component

      expect(Component.state.ApiResponse).toEqual(mockedResponse);
      expect(moxios.requests.mostRecent().url).toBe('https://dummyjson.com/auth/login');
      expect(moxios.requests.mostRecent().config.method).toBe('post');
      done();
    }, 1000)
  });
})
