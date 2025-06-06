# RYOKO - Travel Agency Platform

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/VinithaChowdary/RYOKO">
    <img src="src/assets/Website_img.png" alt="RYOKO Logo" width="600">
  </a>
  <p align="center">
    A modern travel agency platform built with React and Node.js
    <br />
    <a href="https://github.com/VinithaChowdary/RYOKO"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ryoko-8fc7a.web.app">View Demo</a>
    ·
    <a href="https://github.com/VinithaChowdary/RYOKO/issues">Report Bug</a>
    ·
    <a href="https://github.com/VinithaChowdary/RYOKO/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

RYOKO is a full-stack travel agency platform that allows users to browse and book hotels, manage their travel plans, and explore various destinations. The platform features a modern UI, secure authentication, and integrated payment processing.

### Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Express][Express.js]][Express-url]
* [![MySQL][MySQL.com]][MySQL-url]
* [![Firebase][Firebase.com]][Firebase-url]
* [![Vite][Vite.js]][Vite-url]

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

* Node.js (v14 or higher)
* MySQL
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/VinithaChowdary/RYOKO.git
   ```

2. Install NPM packages for frontend
   ```sh
   cd ryoko
   npm install
   ```

3. Install NPM packages for backend
   ```sh
   cd backend
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   GROQ_API_KEY=your_groq_api_key
   ```

5. Set up your MySQL database and update the connection details in `backend/index.js`

6. Start the development server
   ```sh
   # Frontend
   npm run dev

   # Backend
   cd backend
   node index.js
   ```

## Features

- User authentication with Firebase
- Hotel search and filtering
- Price range selection
- User profile management
- Secure booking system
- Responsive design
- reCAPTCHA integration
- MySQL database integration

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/VinithaChowdary">
        <img src="https://github.com/VinithaChowdary.png" width="100px;" alt="Vinitha Chowdary"/><br />
        <sub><b>Vinitha Chowdary</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gamidirohan">
        <img src="https://github.com/gamidirohan.png" width="100px;" alt="Rohan Gamidi"/><br />
        <sub><b>Rohan Gamidi</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/koolkishan">
        <img src="https://github.com/koolkishan.png" width="100px;" alt="Kishan Kumar"/><br />
        <sub><b>Kishan Kumar</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/TejaswiMuppala">
        <img src="https://github.com/TejaswiMuppala.png" width="100px;" alt="Tejaswi Muppala"/><br />
        <sub><b>Tejaswi Muppala</b></sub>
      </a>
    </td>
  </tr>
</table>

## Contact
Linkedin - [@rohangamidi](https://www.linkedin.com/in/rohan-gamidi/)
Linkedin - [@vinithachowdary](https://www.linkedin.com/in/vinitha-chowdary/)

Project Link: [https://github.com/VinithaChowdary/RYOKO.git](https://github.com/VinithaChowdary/RYOKO.git)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/VinithaChowdary/RYOKO.svg?style=for-the-badge
[contributors-url]: https://github.com/VinithaChowdary/RYOKO/graphs/contributors
[license-shield]: https://img.shields.io/github/license/VinithaChowdary/RYOKO.svg?style=for-the-badge
[license-url]: https://github.com/VinithaChowdary/RYOKO/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rohangamidi

<!-- CONTRIBUTOR LINKS -->
[vinitha-url]: https://github.com/VinithaChowdary
[rohan-url]: https://github.com/gamidirohan
[kishan-url]: https://github.com/koolkishan
[tejaswi-url]: https://github.com/TejaswiMuppala

<!-- TECHNOLOGY LINKS -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com
[MySQL.com]: https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com
[Firebase.com]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white
[Firebase-url]: https://firebase.google.com
[Vite.js]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev
