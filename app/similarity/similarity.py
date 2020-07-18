import spacy
import re
nlp = spacy.load("en_core_web_sm")

commands_qualifications = ["high school, undergraduate, graduate"]
userInput = "High school"

def similarity_index(arr, text):
    scores = []
    maximum = 0.0
    index = 0
    text = nlp(re.sub(r"[^a-zA-Z0-9]+", ' ', text).lower())
    for word in arr:
        print(word)
        word = nlp(word)
        score = word.similarity(text)
        print(score)
        if score > maximum:
            maximum = score

    for command in arr:
        if arr[index] == command:
            break
        else:
            index = index + 1

    if maximum >= 60:
        print("Do you mean " + arr[index])

similarity_index(commands_qualifications, userInput)