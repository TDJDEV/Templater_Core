# Otorp.js Reboot Changelog

All notable changes to the Otorp.js library will be documented in this file.

## [v1.0.0] - Reboot - 2023-09-05

### Overview

The Otorp.js library has undergone a complete reboot, establishing a stronger foundation for the project. This decision was driven by the intention to ensure a more robust framework. To achieve this, a meticulous categorization of potential enhancements has been undertaken. This strategy aims to prevent any dispersion or unfocused efforts during development by aligning tasks with specific areas.

Through this comprehensive categorization, a clear and organized structure has been established, effectively managing forthcoming features. This approach facilitates focused resource allocation, enhances team collaboration, and ensures a methodical consideration of all project facets.

The outcome is a more streamlined communication process, offering a coherent overview of project progress and priorities. Ultimately, this reboot's objective is to elevate code quality, optimize development efficiency, and deliver an exceptional user experience. By avoiding unnecessary scattering of efforts and concentrating on pertinent domains, the project is poised for enhanced success.

#### New Logs Categories and Subcategories

- General:
  - Options: Features related to configuring the library's optional settings and preferences during initialization.
  - Engine: Features related to managing and optimizing the underlying library process.

- Browser and Web APIs:
  - Browser Information and Frames: Features related to providing information about the browser and managing frames within web pages.
  - Navigation: Features related to URL navigation handling and browser history.
  - Communication: Features related to  facilitating communication with servers, enabling data fetching, real-time connections, and notifications.
  - Timers and Scheduling: Features related to scheduling tasks and managing time-related operations.
  - Geolocation and Mapping: Features related to retrieval of user's geographic position and interaction with maps.
  - Graphics and Multimedia: Features related to graphics rendering, animations, and handling multimedia elements.
  - Storage and Data Persistence: Features related to client-side data storage and persistence.
  - Multithreading and Background Processing: Features related to background threading and offline capabilities.

- Document Object Model:
  - DOM Manipulation: Features related to interacting with the Document Object Model, including documents, elements, and collections.
  - Event Handling and Interaction: Features related to handling events and user interactions within the DOM.

- Helpers:
  - Objects and Data Structures: Features related to core objects and data structures including arrays, maps, sets, and primitive wrappers.
  - Functions and Asynchronous: Features related to functions, asynchronous programming, promises, and proxies.
  - Error Handling and Debugging: Features related to handling and identifying errors and exceptions.
  - Date and Time: Features related to dates, times, and time zones.
  - Regular Expressions: Features related to  patterns and text matching.
  - Mathematics and Utilities: Features related to mathematical functions, logging, and other utility functionalities.


### Added

#### General
- **Options**
  - Custom Method Prefix:  Introducing the ability to set custom method prefixes for library methods and properties. This feature enhances control over method names, preventing conflicts with emerging JavaScript updates and libraries.
  - Casing Convention Preference: ntroducing the ability to choose the casing convention for library methods and properties. This innovative feature ensures consistency in method naming and aligns with your preferred coding style.

#### Document Object Model
- **DOM Manipulation**:
  - Aliases for Native Methods: Providing shorthand methods for common DOM manipulations.
  - Batch Operation: Enabling batch operations on collections like `HTMLCollection` and `NodeList`.

#### Helpers
- **Objects and Data Structures**:
  - **Array Enhancement**: Elevate the capabilities of `Array` methods to encompass `HTMLCollection` and `NodeList`, enabling the seamless application of functions such as `reduce`, `every`, etc. The syntax simplifies usage: `collections.map(fn)`.

- **Mathematics and Utilities**:
  - **Mathematical Convenience**: Amplify the utility of `Math` methods by extending them to `Number`, facilitating direct application from Number instances. Enjoy the fluidity of expressions like `(2).pow(3)` or `(4).sqrt()`.

## [Unreleased]

### Added
  #### Document Object Model
  - **DOM Manipulation**:
    - New Helper Functions:
      - `pop`: Remove the last child of an HTMLElement.
      - `shift`: Remove the first child of an HTMLElement.
      - `css`: Set the style of an HTMLElement or get its computed style if there is no second parameter.
      - `attr`: A shortcut for (get/set/remove)Attr, providing a convenient way to manipulate attributes on DOM elements.

### Changed

- N/A

### Removed

- N/A

### Deprecated

- N/A

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---

The Otorp.js library has been reimagined with this reboot, offering an improved structure, enhanced functionalities, and a more organized approach. These changes are designed to provide developers with a more seamless and powerful toolkit for building dynamic web applications.
