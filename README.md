# Code Converter App

## Description
The Code Converter App is a versatile tool that allows users to convert, debug, and analyze code written in various programming languages. It utilizes the OpenAI GPT-3.5 turbo model to provide dynamic code conversion, debugging assistance, and code analysis.

## Deployed Links
- [Live Demo](https://code-converter-fw24-335.netlify.app/)
- [Backend](https://precious-gray-clothes.cyclic.app)

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js, OpenAI API

## Functionalities
- **Code Conversion**: Convert code from one programming language to another, supporting a variety of languages.
- **Code Debugging**: Get debugging assistance by submitting code and receiving error analysis and potential solutions.
- **Code Quality Analysis**: Receive an analysis of code quality, consistency, performance, and documentation.
- **User-Friendly Interface**: Intuitive interface for inputting code and choosing functionalities.
- **Real-Time Interaction**: Communicate with the OpenAI GPT-3.5 turbo model in real time for interactive code-related tasks.

## Route Endpoints
1. **Base Endpoint**: `/`
   - Description: Base endpoint of the application.
   
2. **Code Conversion Endpoint**: `/convert`
   - Description: Convert code from one language to another.
   - Method: POST
   - Request Body:
     ```
     {
         "code": "code snippet",
         "language": "target language"
     }
     ```
   
3. **Code Debugging Endpoint**: `/debug`
   - Description: Provide debugging assistance for code.
   - Method: POST
   - Request Body:
     ```
     {
         "code": "code snippet",
         "language": "programming language"
     }
     ```
   
4. **Code Quality Check Endpoint**: `/qc`
   - Description: Analyze code quality, consistency, and performance.
   - Method: POST
   - Request Body:
     ```
     {
         "code": "code snippet",
         "language": "programming language"
     }
     ```

## Screenshots
- To be added

## Areas of Improvement
- **Enhanced User Experience**: Improve the user interface and provide clearer instructions for each functionality.
- **Support More Languages**: Expand the range of supported programming languages for conversion and analysis.
- **Error Handling**: Implement robust error handling and provide meaningful error messages to users.
- **Optimize Performance**: Optimize backend performance to handle concurrent requests efficiently.
- **Real-time Interaction**: Explore real-time chat interaction with the GPT-3 model for a more interactive experience.

## How to Run Locally
1. Clone the repository: `git clone repository-url`
2. Install dependencies: `npm install`
3. Configure environment variables: Create a `.env` file and set up the required variables.
4. Run the backend: `npm start`
5. Clone and set up the frontend repository: `git clone frontend-repo-url && npm install && npm start`

Feel free to contribute to the project by submitting issues and pull requests!
