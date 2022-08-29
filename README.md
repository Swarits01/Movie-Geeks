# Movie-Geeks
![image](https://user-images.githubusercontent.com/59362251/187152595-271d2c4d-b62a-4572-a816-82d395aad8bb.png)
### Procedure
1.	User speaks to the device and the device hears the invocation word.
2.	Audio is streamed from the Alexa Device to Amazon Alexa Service.
3.	Alexa Service converts the voice stream into text and determines that the request is for a skill by looking at the skill configuration information.
4.	Alexa service sends the request to a skill service that the developer created.
5.	Skill service takes action on the request and generates a response that is sent back to the Amazon Alexa Service.
6.	Finally, the Alexa responds to the users.

## About
Movie-Geeks is a platform that will recommend the users movies based on their input. It will use Voice User Interface to take commands from the users then try to identify which developer made skill it should transmit the data to process the information and deliver the speak output.

## DETAILED WORKFLOW
 ![image](https://user-images.githubusercontent.com/59362251/187153053-6c4724a2-4ef2-451a-a56f-632ca68215c7.png)
### PROCEDURE
1.	User speaks to the device and the device hears the invocation word (Alexa).
2.	Audio is streamed from the Alexa Device to Amazon Alexa Service.
3.	Alexa Service converts the voice stream into text and determines that the request is for a skill by looking at the skill configuration information.
4.	Alexa service sends the request to a skill service that invokes the skill function.
5.	Skill function establishes connection with the external API using AXIOS.
6.	AXIOS sends a request to the external API based on the Parameters received from the Alexa Device.
7.	AXIOS fetches the required information and returns an object.
8.	Skill function returns the Speak Output required by the Alexa Skill.
9.	Alexa Skill sends the Speak Output to the Alexa Device.
10.	Finally, Alexa responds with the speak output.
