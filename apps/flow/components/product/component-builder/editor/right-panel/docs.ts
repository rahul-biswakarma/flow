export const codeDocs = `
    <h1>Creating Components for No-Code Builder</h1>
    <h2>Introduction</h2>
    <p>This document serves as a guideline for developers tasked with building components for a no-code environment using React. The components should be adaptable and consistent with our visual theme by utilizing Radix UI and theme colors.</p>
    <h3>Prerequisites</h3>
    <ul>
        <li>Familiarity with React.js</li>
        <li>Basic understanding of Radix UI components</li>
        <li>Knowledge of CSS and styled-components</li>
    </ul>

    <h2>Guidelines</h2>
    <h3>1. Use React</h3>
    <p>All components should be built using the React framework. This ensures they are compatible with our no-code builder, which is designed to support React components.</p>
    <pre><code>import React from 'react';

function ExampleComponent({ children }) {
    return &lt;div>{children}&lt;/div>;
} </code></pre>

    <h3>2. Default Export</h3>
    <p>Each component file should default export the component itself. This makes it easier to dynamically load and integrate components within the builder.</p>
    <pre><code>export default ExampleComponent;</code></pre>

    <h3>3. Use Radix UI Theme for Consistency</h3>
    <p>To maintain a uniform look across all components, use the Radix UI’s theme setup. This helps in keeping the user interface consistent. <a href="https://www.radix-ui.com/themes/docs/components/" target="_blank">Refer the Radix UI doc</a></p>
    <pre><code>import { Text } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { Dropdown } from "@radix-ui/themes";
...</code></pre>

    <h3>4. Use <code>props.style</code> for External Style Modification</h3>
    <p>Allow external style customizations by accepting a <code>style</code> prop. This prop should be spread into the component's main element to apply custom styles directly.</p>
    <pre><code>function ExampleComponent({ style, children }) {
    return &lt;div style={style}>{children}&lt;/div>;
}</code></pre>

    <h3>5. Add Props Field in Props Builder</h3>
    <p>Ensure to declare all component props in the props builder interface. Use the props in your component like <code>props.fieldName</code>. This allows end-users to input values for these props when they configure components in the no-code builder.</p>
    <pre><code>function ExampleComponent({ title, style }) {
    return &lt;h1 style={style}>{title}&lt;/h1>;
}</code></pre>

    <h3>6. Use Theme Colors for Consistency</h3>
    <p>Maintain the use of theme-based color variables to ensure UI consistency. When designing components, utilize the predefined color scheme, structured as <code>var(--color_name-level)</code> and <code>var(--color_name-variant)</code>.</p>
    <pre><code>/* Example in CSS for component styling */
.component {
    background-color: var(--gray-1);
    color: var(--accent-7);
}</code></pre>

    <h4>Theme Colors</h4>
    <p>Utilize the following color variables within your components:</p>
    <pre>"gray", "accent", "crimson", "jade", "indigo", "green", "blue", "orange", "purple",  "teal", "gold", "violet", "plum", "yellow",</code></pre>
    <p>Use the colors in the following format.</p>
    <pre><code>var(--color-1) to var(--color-12)

var(--color-a1) to var(--color-a12)</code></pre>

    <h2>Conclusion</h2>
    <p>Following the above guidelines ensures the creation of flexible, consistent, and visually integrated components for the no-code builder. Remember to rigorously test each component for responsive behavior and adherence to the established theme.</p>

    <p>Happy coding!</p>
 `;
