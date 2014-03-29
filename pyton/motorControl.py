
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
enable_pin = 7
coil_A_1_pin = 18
coil_A_2_pin = 23
coil_B_1_pin = 24
coil_B_2_pin = 25

GPIO.setup(enable_pin, GPIO.OUT)
GPIO.setup(coil_A_1_pin, GPIO.OUT)
GPIO.setup(coil_A_2_pin, GPIO.OUT)
GPIO.setup(coil_B_1_pin, GPIO.OUT)
GPIO.setup(coil_B_2_pin, GPIO.OUT)
GPIO.output(enable_pin, 1)

def backwards1p(delay, steps):
 for i in range(0, steps):
   setStep(0, 0, 0, 1)
   time.sleep(delay)
   setStep(0, 0, 1, 0)
   time.sleep(delay)
   setStep(0, 1, 0, 0)
   time.sleep(delay)
   setStep(1, 0, 0, 0)
   time.sleep(delay)
   
def forward1p(delay, steps):  
 for i in range(0, steps):
   setStep(1, 0, 0, 0)
   time.sleep(delay)
   setStep(0, 1, 0, 0)
   time.sleep(delay)
   setStep(0, 0, 1, 0)
   time.sleep(delay)
   setStep(0, 0, 0, 1)
   time.sleep(delay)

def backwards2p(delay, steps):
 for i in range(0, steps):
   setStep(0, 0, 1, 1)
   time.sleep(delay)
   setStep(0, 1, 1, 0)
   time.sleep(delay)
   setStep(1, 1, 0, 0)
   time.sleep(delay)
   setStep(1, 0, 0, 1)
   time.sleep(delay)
   
def forward2p(delay, steps):  
 for i in range(0, steps):
   setStep(1, 0, 0, 1)
   time.sleep(delay)
   setStep(1, 1, 0, 0)
   time.sleep(delay)
   setStep(0, 1, 1, 0)
   time.sleep(delay)
   setStep(0, 0, 1, 1)
   time.sleep(delay)

def backwardshs(delay, steps):
 for i in range(0, steps):
   setStep(0, 0, 0, 1)
   time.sleep(delay)
   setStep(0, 0, 1, 1)
   time.sleep(delay)
   setStep(0, 0, 1, 0)
   time.sleep(delay)
   setStep(0, 1, 1, 0)
   time.sleep(delay)
   setStep(0, 1, 0, 0)
   time.sleep(delay)
   setStep(1, 1, 0, 0)
   time.sleep(delay)
   setStep(1, 0, 0, 0)
   time.sleep(delay)
   setStep(1, 0, 0, 1)
   time.sleep(delay)

def forwardhs(delay, steps):
 for i in range(0, steps):
   setStep(1, 0, 0, 1)
   time.sleep(delay)
   setStep(1, 0, 0, 0)
   time.sleep(delay)
   setStep(1, 1, 0, 0)
   time.sleep(delay)
   setStep(0, 1, 0, 0)
   time.sleep(delay)
   setStep(0, 1, 1, 0)
   time.sleep(delay)
   setStep(0, 0, 1, 0)
   time.sleep(delay)
   setStep(0, 0, 1, 1)
   time.sleep(delay)
   setStep(0, 0, 0, 1)
   time.sleep(delay)
 
def setStep(w1, w2, w3, w4):
 GPIO.output(coil_A_1_pin, w1)
 GPIO.output(coil_A_2_pin, w2)
 GPIO.output(coil_B_1_pin, w3)
 GPIO.output(coil_B_2_pin, w4)


try:
   while True:
       delay = raw_input("Delay between steps (milliseconds)?")
       f_steps = raw_input("How many steps forward? ")
       b_steps = raw_input("How many steps backwards? ")
       print "Half step"
       forwardhs(int(delay) / 1000.0, int(f_steps))
       backwardshs(int(delay) / 1000.0, int(b_steps))
       time.sleep(2)
       print "One Phase"
       forward1p(int(delay) / 1000.0, int(f_steps))
       backwards1p(int(delay) / 1000.0, int(b_steps))
       time.sleep(2)
       print "Two Phase"
       forward2p(int(delay) / 1000.0, int(f_steps))
       backwards2p(int(delay) / 1000.0, int(b_steps))
       time.sleep(2)

except KeyboardInterrupt:
   print "  Quit"
   # Reset GPIO settings
   GPIO.cleanup()