import { Component } from 'vue';

export interface AddMenuEntry {
  value: string;
  icon: string;
  label: string;
}

export interface EditMenuEntry {
  name: string;
  template: Component;
}
