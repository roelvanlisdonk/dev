import toSnakeCase from "./to.snake.case";
import { Component } from "@angular/core";
@Component({
  selector: 'my-app',
  template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }

export default function start() {
    console.log("app starte!!!");
    toSnakeCase();
}

start();