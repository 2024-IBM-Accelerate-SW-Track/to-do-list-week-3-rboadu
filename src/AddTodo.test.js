import { render, screen, fireEvent} from '@testing-library/react';
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

 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name:/Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name:/Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate }});
  fireEvent.click(element);
  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate }});
  fireEvent.click(element);
  
  const tasks = screen.getAllByText(/History Test/i);
  expect(tasks.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name:/Add/i});
  const dueDate = "05/30/2023";
  
  fireEvent.change(inputDate, {target: {value: dueDate }});
  fireEvent.click(element);
  
  const tasks = screen.queryByText(new RegExp(dueDate, "i"));
  expect(tasks).not.toBeInTheDocument();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name:/Add New Item/i});
  const element = screen.getByRole('button', {name:/Add/i});

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.click(element);

  const task = screen.queryByText(/History Test/i);
  expect(task).not.toBeInTheDocument();

 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name:/Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name:/Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate }});
  fireEvent.click(element);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const task = screen.queryByText(/History Test/i);
  expect(task).not.toBeInTheDocument();
 });

 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name:/Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name:/Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: dueDate }});
  fireEvent.click(element);
  
  const task = screen.getByText(/History Test/i).style.background;
  expect(task).not.toBe("white");
 });