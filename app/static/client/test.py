from client import Client  # ignore import error
import time
from threading import Thread

def update_messages():
    """
    UPDATES NEW MESSAGE
    :return: None
    """
    msgs = []
    running = True

    while running:
        time.sleep(0.1)
        new_messages = c1.get_messages()
        msgs.extend(new_messages)
        for msg in new_messages:
            print(msg)
            disconnect = "{quit}"
            disconnect = disconnect.encode()
            if msg == disconnect:
                running = False
                break
            
Thread(target=update_messages).start()

c1 = Client("Sharon")
c2 = Client("Joe")

time.sleep(3)
c1.send_message("hello")
time.sleep(3)
c2.send_message("hi")
time.sleep(3)
c1.send_message("how are you doing?")
time.sleep(3)
c2.send_message("I am good")
time.sleep(3)

c1.disconnect()
time.sleep(3)
c2.disconnect()
