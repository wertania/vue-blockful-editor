import { DirectiveBinding } from 'vue';

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void;
}

export default {
  beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
    // Define the click event handler
    el.clickOutsideEvent = (event: MouseEvent) => {
      // Check if the click happened outside the element and if the element does not contain the click
      if (
        !(el === event.target || el.contains(event.target as Node)) &&
        (event.target as HTMLElement).getAttribute('data-func') !== 'openMenu'
      ) {
        // Call the method provided by the binding
        binding.value(event);
      }
    };
    // Register the click event listener
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: ClickOutsideElement) {
    // Clean up the event listener when the element is removed from the DOM
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  },
};
