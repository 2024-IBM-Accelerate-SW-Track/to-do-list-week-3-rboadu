import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders', () => {
  render(<App />, container);
 });

test('test that new-item-button is a button', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-button');
  expect(element.outerHTML.toLowerCase().includes("button")).toBe(true)
});

test('test that new-item-input is an input ', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-input');
  expect(element.innerHTML.toLowerCase().includes("input")).toBe(true)
});