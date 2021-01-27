# Interview Scheduler
Find it hard to keep track of all the interviews?

Try Interview Scheduler! Built with modern React, Interview Scheduler helps you stay on top of all the appointments.

Book, edit, and cancel interviews as you like. Keep track of the scheduled appointments easily than ever before.

## Final Product

!["appointments"](docs/image1.png)

!["booking-interview"](docs/image3.png)

!["appointments booked"](docs/image2.png)

!["deleting-interview"](docs/image4.png)

## Technology

Single-page application built with modern React practices such as hooks and functional components.

Front-End: HTML, SCSS, React

Back-End: Node, Express, PostgreSQL

## Dependencies

- React 16.9.0 or above
- Axios
- Classnames
- Node.js
- Express
- Node-postgres

## How To Use Interview Scheduler

#### Book an Interview

Click on any available spot, enter the name of the interviewee and select an interviewer.
  
If no spots are available, you can choose a different day on the left sidebar.

#### Edit an Interview

Something changed? No problem.

Simply hover over an appointment, click the edit button, do the changes, and hit save.

#### Delete an Interview

Hover over an appointment and click the delete button. 

## Testing

This app was extensively tested using the following technologies:

- Storybook for unit testing
- Jest for unit and integration testing
- Cypress for end to end testing

## Setup

1. Install all dependencies (using the `npm install` command).
2. Download and install [scheduler-api](https://github.com/ramya2507/scheduler-api) following the instructions on its repo.
3. Start the API server while in the "scheduler-api" directory using `npm start`.
4. Start the Webpack development server while in the "scheduler" directory using `npm start`. The app will be served at <http://localhost:8000/>. Enjoy!

