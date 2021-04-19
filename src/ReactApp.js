import { render, createElement, createTextElement } from "./utils";
import "./styles.css";

const React = { createElement };
const textElement = createTextElement("Hello world");


const element = createElement("h1", undefined, textElement);

const ele = <h1>Hello</h1>;

const container = document.getElementById("root");

render(element, container);
render(ele, container);
