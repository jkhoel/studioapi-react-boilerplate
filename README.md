
# StudioAPI Boilerplate
This boilerplate enables the use of the studioapi.js that ships with CDP Studio to be used with modern React components. Studioapi.js is rather old and does not contain any exports. It also utilizes old versions of libraries making it difficult to import into modern style javascript applications.

Each CDP Application runs a StudioAPIServer exposed on 127.0.0.x:7689 (See Application Output window in CDP Studio for the exact information). This server can then be accessed via websocket and will pass data serialized as protocol-buffers. Notice the missing last number of the localhost address, as running multiple application on the same host will increase this value starting at 1.

## How it works
Studioapi.js needs all its dependencies exposed to the DOM via `<script>` tags in index.html. The problem then becomes how to expose the studio function to the react components for further use. This is done via index.js. Here we are able to access the studio function as this file is also supplied via a `<script>` tag in index.html. We then create the ApiWrapper-component and mount this to the DOM with ReactDOM - passing the studio function as a prop in the process!

## How to use
TBD...

## Learn More
Visit [CDP Stuido](https://www.cdpstudio.com) to learn more about how to build fast, distributed control systems on industrial computers.

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about protocol-buffers, visit [the official Google documentation](https://developers.google.com/protocol-buffers/docs/overview)