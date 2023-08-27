const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Setting up the OpenAI
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// -------------ends -------------------

app.get("/", (req, res) => {
	res.send("Base Endpoint");
});

// Compiling Endpoint
app.post("/convert", async (req, res) => {
	try {
		const { code, language } = req.body;

		const prompt = `Act as a dynamic compiler , detect the lanaguage of the fillowing code.
            
        ${code}

        your task is to convert the code into ${language} and return the converted code.

        as follows 
            {
                code : {converted code},
                extra : {extra information}
            }
        
        `;
		const chatCompletion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		});

		res.status(200).send(chatCompletion.data.choices[0].message);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error.message });
	}
});

// Debugging Endpoint
app.post("/debug", async (req, res) => {
	try {
		const { code, language } = req.body;

		const prompt = `Act as a ${language} compiler , following is the code.
            
        ${code}

        your task is to debug it and give the errors and if there is no error then do also tell that 
		
		as follows 
            
			{
                error : [list the errors if any as an array],
				numberError : {number of the error},
                extra : {extra information}
            }
        
        `;

		const chatCompletion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		});

		res.status(200).send(chatCompletion.data.choices[0].message);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error.message });
	}
});

//Quality Check
app.post("/qc", async (req, res) => {
	try {
		const { code, language } = req.body;

		const prompt = `Act as a ${language} developer , following is the code.
            
        ${code}

        your task is to go through the entire code , analize it with parameters like Code Quality, Code Consistency, Code Performance, Code Documentation, Error Handling, Code Testability and give the analysis as follows 
            
			{
                analysis : [list the result of the parameters as an array],
				numberRes : {number of the parameters},
                extra : {extra information}
            }
        
        `;

		const chatCompletion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		});

		res.status(200).send(chatCompletion.data.choices[0].message);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error.message });
	}
});

app.listen(port, () => {
	console.log(`Listening @ ${port}`);
});
