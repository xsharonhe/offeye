import speech_recognition as sr 
# import pyttsx3
from gtts import gTTS
import os

class Speech():
    def __init__(self):
        pass
    
    def SpeakText(self, command): 
        engine = pyttsx3.init()
        engine.say(command)  
        engine.runAndWait()
        
    # def SpeechToText(self):
    #     try:
    #         print("I have started")
    #         with sr.Microphone() as source2:
    #             r = sr.Recognizer()
    #             r.adjust_for_ambient_noise(source2, duration=0.2)
    #
    #             audio2 = r.listen(source2)
    #             MyText = r.recognize_google(audio2)
    #             MyText = MyText.lower()
    #
    #             print("Did you say "+MyText)
    #             self.SpeakText(MyText)
    #             return MyText
    #     except sr.RequestError as e:
    #             print("Could not request results; {0}".format(e))
    #     except sr.UnknownValueError:
    #             print("unknown error occured")
    #     finally:
    #         return "Sorry we could not comprehend"
        
    def TextToSpeech(self, text):
        try:
            language = 'en'
            myobj = gTTS(text=text, lang=language, slow=False)
            myobj.save("emailsent.mp3 ")
            os.system("mpg321 emailsent.mp3")
            return True 
        except Exception as e:
            print("[COULD NOT PLAY AUDIO]", e)
        finally:
            return False 

speech = Speech()
speech.TextToSpeech("Email has been sent!")
