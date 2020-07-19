# offeye
[![SAMPLE VIDEO](https://img.youtube.com/vi/n1DdqmoTcWY/0.jpg)](https://www.youtube.com/watch?v=n1DdqmoTcWY)
View at: https://devpost.com/software/offeye-o1mriw

## Inspiration
According to the United Nations, over 75 million young people were reported to be unemployed. Especially during the COVID-19 pandemic, this figure is expected to rise. Thus, we have decided to create a multi-user real-time chat application that allows people to discuss the job searching process based on their level of education. Additionally, we have incorporated a bot that allows users to automate tasks normally done during job searching, such as automating subscribing to job newsletters and setting events through Google Calendar.

## What it does
OffEye is a job search service that exists in the form of a chatbot webapp. The OffEye chatbot offers the ability for users to use command words to customize the job search according to their personal circumstances. When the user sees an event or job of interest, they can add it to their google calendar within the webapp. The chatbot also provides a platform for people with similar background to share their experience, as by using their education level we will be able to put them in different chatrooms. The chatbot also offers audio support which allows people with some degree of vision loss to also access the service through text-to-speech recognition. There is also an option (**which was not included in the video for sake of time restraints**) that enables users to check their chat history so that they are able to filter through all of their past messages.

## How I built it
Using flask-socketio, we were able to run multiple threads on our server that enabled the real-time, multi-user component of our application, as well as running multiple chat rooms. By storing the login information in flask's session options and using a sqlite3 database, we were able to store the user's message. For speech to text recognition, I used the gTTS software that converted text to speech audio files and then played it on the frontend using Javascript. For automating sending emails, we used flask-mail and an smtp server. Ajax allowed us to add scrolling features to our chat conversations. The handling of admin privileges was a combination of storing the information on the sqllite3 database to block non-admins for authentication and using the Ajax to show and hide admin privileges. For the front end, simple Bootswatch Lux template was added to minimize the frontend design needed for the project.

## Challenges we ran into
* I have never worked with sockets and threading in Python before. Using flask, it was easier but was a steep learning curve, although I have had some previous exposure in Java.
* Connecting the backend with the frontend was difficult because I had to retrieve the data from the database and then send it back to frontend so that the messages could show up on screen, and vice versa, because the messages had to be stored in the database.
* The google calendar function is built using html and javascript with the integration of Google Calendar API. 
* Integration of automation tasks from Python to Javascript
* My internet broke down and it was hard to run concurrently on the same localhost server 

## Accomplishments that we are proud of
* This was my first time working with javascript and APIs so even the basic syntax was quite difficult to understand. The Google Calendar API was particularly hard to incorporate. There were many import packages in the IDE that were in different versions compared to the ones implemented in the Google Calendar API. I had a few files that crashed names with the node_modules so it caused circular path errors.  
* I am proud of finishing such a large project in less than 24 hours
* I am proud of being able to execute email automation, text to speech recognition, and develop some minor nlp models
* Creating an application that raises awareness for UN development goals
* Authenticating admin users using flask database and jsonify objects

## What we learned
* I learned about how to integrate Google APIs into personal projects. In addition, I also learned about how to use bootstraps to style html. 
* I learned how to use flask and sqlite3 together. I have not had any previous experiences in Python web development, so it was interesting to see how it differed from Javascript web applications.
* How broad and powerful Python is as a backend language in terms of automation

## What's next for OffEye
* Mobile responsiveness and deployment
* Actual text-to-speech recognition rather than just sending in strings to get an output and then playing an audio file
* Fix some of the minor bugs in terms of the html elements showing up for only admin users
* Create 404 page errors for those who have already logged in
* Integration of Google Calendar API with the flask application
